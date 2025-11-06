import "./settings/config.js";
import {
  makeWASocket,
  useMultiFileAuthState,
  jidDecode,
  DisconnectReason
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import readline from "readline";
import pino from "pino";
import chalk from "chalk";
import fs from "fs-extra";
import NodeCache from "node-cache";
import fileType from "file-type";
const { fileTypeFromBuffer } = fileType;
import axios from "axios";
import * as jimp from "jimp";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { smsg } from "./source/myfunc.js";
import handleMessage from "./source/message.js";

// Global settings
global.mode = true; // Public mode
global.sessionName = "session"; // Session folder

const msgRetryCounterCache = new NodeCache();

// Helper functions
const createReadline = () => readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (rl, text) => new Promise((resolve) => rl.question(text, resolve));

// Download a file from URL
const getBuffer = async (url, options = {}) => {
  try {
    const res = await axios({
      method: "get",
      url,
      headers: { DNT: 1, "Upgrade-Insecure-Request": 1 },
      responseType: "arraybuffer",
      ...options
    });
    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

// Resize image using Jimp
const resize = async (imagePathOrUrl, width, height) => {
  let imageBuffer;
  if (/^https?:\/\//.test(imagePathOrUrl)) {
    const response = await axios.get(imagePathOrUrl, { responseType: "arraybuffer" });
    imageBuffer = response.data;
  } else {
    imageBuffer = await fs.readFile(imagePathOrUrl);
  }
  const read = await jimp.read(imageBuffer);
  return await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
};

// Delay function
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function startServer() {
  // Catch unhandled errors
  process.on("unhandledRejection", (err) => console.error(err));
  process.on("uncaughtException", (err) => console.error(err));

  // Load authentication state
  const { state, saveCreds } = await useMultiFileAuthState("./" + global.sessionName);

  let conn = null;
  let reconnecting = false;
  let backoff = 5000;

  const startSock = async () => {
    if (conn?.ev) {
      try {
        conn.ev.removeAllListeners("creds.update");
        conn.ev.removeAllListeners("messages.upsert");
        conn.ev.removeAllListeners("connection.update");
      } catch {}
    }

    // Create WhatsApp socket connection
    conn = makeWASocket({
      printQRInTerminal: false,
      logger: pino({ level: "silent" }),
      browser: ["Linux", "Chrome", "20.0.00"],
      auth: state,
      msgRetryCounterCache,
      connectTimeoutMs: 60000,
      emitOwnEvents: true,
      fireInitQueries: true,
      generateHighQualityLinkPreview: true,
      syncFullHistory: false,
      markOnlineOnConnect: true
    });

    global.conn = conn;
    conn.ev.on("creds.update", saveCreds);

    // If user is not registered, ask for phone number
    if (!conn.authState.creds.registered) {
      console.log(chalk.cyan("╭──────────────────────────────"));
      console.log(`📨 ${chalk.redBright("Enter your WhatsApp number:")}`);
      console.log(chalk.cyan("├──────────────────────────────"));
      const rl = createReadline();
      let phoneNumber = await question(rl, `   ${chalk.cyan("- Number")}: `);
      rl.close();
      console.log(chalk.cyan("╰──────────────────────────────"));
      phoneNumber = phoneNumber.replace(/[^0-9]/g, "");
      setTimeout(async () => {
        try {
          let code = await conn.requestPairingCode(phoneNumber);
          code = code?.match(/.{1,4}/g)?.join("-") || code;
          console.log(chalk.cyan("╭──────────────────────────────"));
          console.log(` 💻 ${chalk.redBright("Your pairing code")}:`);
          console.log(chalk.cyan("├──────────────────────────────"));
          console.log(`   ${chalk.cyan("- Code")}: ${code}`);
          console.log(chalk.cyan("╰──────────────────────────────"));
        } catch (e) {
          console.log(chalk.red("Failed to get pairing code"), e);
        }
      }, 3000);
    }

    // Decode JID for easier access
    conn.decodeJid = (jid) => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
      } else return jid;
    };

    conn.public = global.mode;
    conn.serializeM = (m) => smsg(conn, m);

    // Listen for new messages
    conn.ev.on("messages.upsert", async (chatUpdate) => {
      try {
        let m = chatUpdate.messages?.[0];
        if (!m?.message) return;
        // Handle ephemeral messages
        m.message = Object.keys(m.message)[0] === "ephemeralMessage" ? m.message.ephemeralMessage.message : m.message;
        if (m.key?.remoteJid === "status@broadcast") return;
        if (!conn.public && !m.key.fromMe && chatUpdate.type === "notify") return;
        if (m.key.id?.startsWith("BAE5") && m.key.id.length === 16) return;
        m = smsg(conn, m);
        await handleMessage(conn, m, chatUpdate);
      } catch (err) {
        console.error(chalk.red("[ERROR MESSAGE]"), err);
      }
    });

    // Reconnect with exponential backoff
    const reconnectWithBackoff = async () => {
      if (reconnecting) return;
      reconnecting = true;
      while (true) {
        try {
          await delay(backoff);
          await startSock();
          reconnecting = false;
          backoff = 5000;
          break;
        } catch {
          backoff = Math.min(backoff * 2, 60000);
        }
      }
    };

    const loadConnect = async () => {};

    // Handle connection updates
    conn.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
        if (reason === DisconnectReason.loggedOut || reason === DisconnectReason.badSession) {
          console.log(chalk.redBright("❌ Bad session, deleting session and restarting..."));
          process.exit();
        } else {
          console.log(chalk.yellow("⚠️ Connection lost, reconnecting automatically..."));
          await reconnectWithBackoff();
        }
      } else if (connection === "open") {
        console.log(chalk.greenBright("✅ Connected to WhatsApp!"));
        await loadConnect();
      }
    });

    // --- Helper functions for sending messages ---
    conn.sendText = (jid, text, quoted = "", options = {}) =>
      conn.sendMessage(jid, { text, ...options }, { quoted, ...options });

    conn.sendImage = async (jid, path, caption = "", quoted = "", options = {}) => {
      const buffer = Buffer.isBuffer(path)
        ? path
        : /^https?:\/\//.test(path)
        ? await getBuffer(path)
        : fs.existsSync(path)
        ? fs.readFileSync(path)
        : Buffer.alloc(0);
      return await conn.sendMessage(jid, { image: buffer, caption, ...options }, { quoted });
    };

    conn.sendAudio = async (jid, path, quoted = "", ptt = false, options = {}) => {
      const buffer = Buffer.isBuffer(path)
        ? path
        : /^https?:\/\//.test(path)
        ? await getBuffer(path)
        : fs.existsSync(path)
        ? fs.readFileSync(path)
        : Buffer.alloc(0);
      return await conn.sendMessage(jid, { audio: buffer, ptt, ...options }, { quoted });
    };

    conn.sendVideo = async (jid, path, caption = "", quoted = "", gif = false, options = {}) => {
      const buffer = Buffer.isBuffer(path)
        ? path
        : /^https?:\/\//.test(path)
        ? await getBuffer(path)
        : fs.existsSync(path)
        ? fs.readFileSync(path)
        : Buffer.alloc(0);
      return await conn.sendMessage(jid, { video: buffer, caption, gifPlayback: gif, ...options }, { quoted });
    };

    return conn;
  };

  await startSock();
}

// Start the server
startServer();

// Watch for file changes and restart
fs.watchFile(fileURLToPath(import.meta.url), () => {
  console.log(chalk.redBright(`📦 File ${fileURLToPath(import.meta.url)} changed, restarting bot...`));
  spawn(process.argv[0], [fileURLToPath(import.meta.url)], { stdio: "inherit" });
  process.exit();
});