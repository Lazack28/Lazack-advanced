

import { loadDataBase } from "../source/events/database.js";
import "../settings/config.js";
import {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType
} from "@whiskeysockets/baileys";
import fs from "fs-extra";
import util from "util";
import chalk from "chalk";
import { exec, spawn } from "child_process";
import axios from "axios";
import syntaxerror from "syntax-error";
import { fileURLToPath } from "url";
import path from "path";
import os from "os";
import * as jimp from "jimp";
import speed from "performance-now";
import {
  generateProfilePicture,
  getBuffer,
  fetchJson,
  fetchText,
  getRandom,
  runtime,
  sleep,
  makeid
} from "../source/myfunc.js";
import { qtext, metaai } from "../source/quoted.js";
import { runPlugins, pluginsLoader } from "../handler.js";
import { leveluser } from "../source/events/_levelup.js";
import { makeStickerFromUrl } from "../source/events/_sticker.js";

let prefix = ".";
let mode = true;

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }
  return dp[a.length][b.length];
}

function similarityPercent(a, b) {
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 100;
  const distance = levenshtein(a, b);
  const similarity = ((maxLength - distance) / maxLength) * 100;
  return Math.round(similarity);
}

async function getCaseCommands(filePath) {
  try {
    const code = await fs.promises.readFile(filePath, "utf8");
    const regex = /case\s+['"`](.*?)['"`]/g;
    const matches = [];
    let match;
    while ((match = regex.exec(code)) !== null) matches.push(match[1]);
    return matches;
  } catch {
    return [];
  }
}

export default async (conn, m) => {
  try {
    await loadDataBase(conn, m);

    const body = m.body || m.text || "";
    const budy = m.body || m.text || "";
    const command = body.startsWith(prefix)
      ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase()
      : "";
    const commands = command.replace(prefix, "");
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");

    const quoted = m.quoted ? m.quoted : m;
    const message = m;
    const messageType = m.mtype;
    const messageKey = message.key;
    const pushName = m.pushName || "Undefined";
    const itsMe = m.key.fromMe;
    const chat = m.chat;
    const sender = m.sender;
    const userId = sender.split("@")[0];
    const reply = m.reply;

    const botNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    const isGroup = m.key.remoteJid.endsWith("@g.us");
    const groupMetadata = isGroup ? await conn.groupMetadata(chat).catch(() => ({})) : {};
    const groupName = isGroup ? groupMetadata.subject : "";
    const groupId = isGroup ? groupMetadata.id : "";
    const groupMembers = isGroup ? groupMetadata.participants : [];
    const isGroupAdmins = isGroup ? !!groupMembers.find((p) => p.admin && p.id === sender) : false;
    const isBotGroupAdmins = isGroup ? !!groupMembers.find((p) => p.admin && p.id === botNumber) : false;

    const TypeMess = getContentType(m?.message);
    let reactions = TypeMess == "reactionMessage" ? m?.message[TypeMess]?.text : false;

    if (reactions) {
      if (["😂"].includes(reactions)) {
        conn.sendMessage(m.chat, { text: "*KWKWKWKWK😹*" }, { quoted: null });
      }
    }

    if (body.startsWith("$")) {
      await m.reply("_Executing..._");
      exec(q, async (err, stdout) => {
        if (err) return m.reply(`${err}`);
        if (stdout) await m.reply(`${stdout}`);
      });
    }

    if (body.startsWith(">")) {
      try {
        const txtt = util.format(await eval(`(async()=>{ ${q} })()`));
        m.reply(txtt);
      } catch (e) {
        let _syntax = "";
        let _err = util.format(e);
        let err = syntaxerror(q, "EvalError", {
          allowReturnOutsideFunction: true,
          allowAwaitOutsideFunction: true,
          sourceType: "module"
        });
        if (err) _syntax = err + "\n\n";
        m.reply(util.format(_syntax + _err));
      }
    }

    if (body.startsWith("=>")) {
      try {
        const txtt = util.format(await eval(`(async()=>{ return ${q} })()`));
        m.reply(txtt);
      } catch (e) {
        let _syntax = "";
        let _err = util.format(e);
        let err = syntaxerror(q, "EvalError", {
          allowReturnOutsideFunction: true,
          allowAwaitOutsideFunction: true,
          sourceType: "module"
        });
        if (err) _syntax = err + "\n\n";
        m.reply(util.format(_syntax + _err));
      }
    }

    if (m.message) {
      console.log(
        chalk.bgMagenta(" [===>] "),
        chalk.cyanBright("Time: ") + chalk.greenBright(new Date()) + "\n",
        chalk.cyanBright("Message: ") + chalk.greenBright(budy || m.mtype) + "\n" + chalk.cyanBright("From:"),
        chalk.greenBright(pushName),
        chalk.yellow("- " + m.sender) + "\n" + chalk.cyanBright("Chat Type:"),
        chalk.greenBright(!isGroup ? "Private Chat" : "Group Chat - " + chalk.yellow(groupName))
      );
    }

    if (!mode && !itsMe) return;
    if (!body.startsWith(prefix)) return;

    if (global.db && global.db.users && global.db.users[m.sender]) {
      const user = global.db.users[m.sender];
      if (user) {
        const oldRole = user.role;
        user.command += 1;
        const newRole = leveluser(user.command).rank;
        if (oldRole !== newRole) {
          user.role = newRole;
          const upuser = `🎉 *SELAMAT NAIK LEVEL!* 🎉\n\n*Nama:* ${pushName}\n*Level Lama:* ${oldRole}\n*Level Baru:* ${newRole}\n\nTerus gunakan bot untuk mencapai level selanjutnya!`;
          conn.sendMessage(m.chat, { text: upuser }, { quoted: qtext });
        }
      }
    }

    const resize = async (imagePathOrUrl, width, height) => {
      let imageBuffer;
      if (/^https?:\/\//.test(imagePathOrUrl)) {
        const response = await axios.get(imagePathOrUrl, { responseType: "arraybuffer" });
        imageBuffer = response.data;
      } else {
        imageBuffer = await fs.readFile(imagePathOrUrl);
      }
      const read = await jimp.read(imageBuffer);
      const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
      return data;
    };

    const reaction = async (jid, emoji) => {
      conn.sendMessage(jid, { react: { text: emoji, key: m.key } });
    };

    const plug = {
      conn,
      command,
      quoted,
      fetchJson,
      qtext,
      budy,
      commands,
      args,
      q,
      message,
      messageType,
      messageKey,
      pushName,
      itsMe,
      chat,
      sender,
      userId,
      reply,
      botNumber,
      isGroup,
      groupMetadata,
      groupName,
      groupId,
      groupMembers,
      isBotGroupAdmins,
      isGroupAdmins,
      generateProfilePicture,
      getBuffer,
      fetchJson,
      fetchText,
      getRandom,
      runtime,
      sleep,
      makeid,
      prefix,
      reaction,
      resize
    };

    const pluginHandled = await runPlugins(m, plug);
    if (pluginHandled) return;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const plugins = await pluginsLoader(path.resolve(__dirname, "../cmd"));
    const pluginCommands = plugins.flatMap((p) => p.command || []);
    const caseCommands = await getCaseCommands(__filename);
    const allCommands = [...new Set([...pluginCommands, ...caseCommands])];

    if (!allCommands.includes(command)) {
      const similarities = allCommands.map((cmd) => ({
        name: cmd,
        percent: similarityPercent(command, cmd)
      }));
      const sorted = similarities.sort((a, b) => b.percent - a.percent).slice(0, 3);
      const filtered = sorted.filter((s) => s.percent >= 60);
      const suggestions = filtered.map((s, i) => `${i + 1}. *${prefix + s.name}* — ${s.percent}%`).join("\n");

      if (filtered.length > 0) {
        const buttons = filtered.map((s) => ({
          buttonId: `${prefix}${s.name}`,
          buttonText: { displayText: `${prefix}${s.name}` },
          type: 1
        }));

        await conn.sendMessage(
          m.chat,
          {
            text: `🔍 Mungkin yang kamu maksud:\n${suggestions}`,
            footer: namebotz,
            buttons,
            headerType: 1,
            viewOnce: true
          },
          { quoted: metaai }
        );
      }

      return;
    }

    switch (commands) {
      case "mode": {
        await reaction(m.chat, "🧠");
        m.reply(`🤖 Bot Mode: ${conn.public ? "Public" : "Self"}`);
        break;
      }

      case "only": {
        let duh = body.slice(body.indexOf(commands) + commands.length).trim() || "return m";
        try {
          let evaled = await eval(`(async () => { ${duh} })()`);
          if (typeof evaled !== "string") evaled = util.inspect(evaled);
          await m.reply(evaled);
        } catch (err) {
          m.reply(String(err));
        }
        break;
      }

      case "runtime":
      case "rt":
      case "ping": {
        const startTime = Date.now();
        function formatRuntime(ms) {
          let seconds = Math.floor(ms / 1000);
          let days = Math.floor(seconds / 86400);
          seconds %= 86400;
          let hours = Math.floor(seconds / 3600);
          seconds %= 3600;
          let minutes = Math.floor(seconds / 60);
          seconds %= 60;
          return `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
        }
        let timestamp = speed();
        let latensi = speed() - timestamp;
        let totalMem = os.totalmem();
        let freeMem = os.freemem();
        let usedMem = totalMem - freeMem;
        let memUsage = (usedMem / totalMem) * 100;
        let uptimeServer = formatRuntime(os.uptime() * 1000);
        let serverTime = new Date().toLocaleString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour12: false
        });
        let teks = `
*— Informasi Bot 🤖*
- *Nama Bot :* ${global.botName || "undefined"}
- *Runtime Bot :* ${runtime(process.uptime())}
- *Response Speed :* ${latensi.toFixed(4)} _Second_ 
- *NodeJS Version :* ${process.version}

*— Informasi Server VPS 🖥️*
- *OS Platform :* ${os.type()} (${os.arch()})
- *Total RAM :* ${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB
- *Terpakai :* ${(usedMem / 1024 / 1024 / 1024).toFixed(2)} GB (${memUsage.toFixed(2)}%)
- *Tersisa :* ${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB
- *Total Disk :* 199.9 GB
- *CPU Core :* ${os.cpus().length} Core
- *Load Avg :* ${(os.loadavg()[0] * 100 / os.cpus().length).toFixed(2)}%
- *Uptime VPS :* ${uptimeServer}
- *Server Time :* ${serverTime}
`;
        m.reply(teks.trim());
        break;
      }

      case "cekidch":
      case "idch": {
        if (!q) return reply(`*Contoh penggunaan :*\nketik ${commands} linkchannel`);
        if (!q.includes("https://whatsapp.com/channel/")) return reply("Link channel tidak valid");
        let result = q.split("https://whatsapp.com/channel/")[1];
        let res = await conn.newsletterMetadata("invite", result);
        let teks = `${res.id}`;
        return m.reply(teks);
      }

      case "sticker":
      case "s": {
        const quotedMessage = m.quoted ? m.quoted : m;
        const mime = (quotedMessage.msg || quotedMessage).mimetype || "";
        if (!/image|video/.test(mime)) return reply(`Reply sebuah gambar/video dengan caption ${prefix}${commands}`);
        try {
          if (/image/.test(mime)) {
            const media = await quotedMessage.download();
            const imageUrl = `data:${mime};base64,${media.toString("base64")}`;
            await makeStickerFromUrl(imageUrl, conn, m, reply);
          } else if (/video/.test(mime)) {
            if ((quotedMessage?.msg || quotedMessage)?.seconds > 10) return reply("Durasi video maksimal 10 detik!");
            const media = await quotedMessage.download();
            const videoUrl = `data:${mime};base64,${media.toString("base64")}`;
            await makeStickerFromUrl(videoUrl, conn, m, reply);
          }
        } catch (error) {
          console.error(error);
          return reply("Terjadi kesalahan saat memproses media. Coba lagi.");
        }
        break;
      }

    case "autotag":
    case "atag": {
      try {
        if (args.length < 2) {
          return m.reply(`*${prefix + command}* 628xx,628xx url caption`);
        }
    
        const kontol = args[0];
        const memek = args[1];
        const fauzi = args.slice(2).join(" ");
        const jids = kontol
          .split(",")
          .map(n => n.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
          .filter(v => v.length > 15);
    
        if (typeof conn.sendStatusMentions === "function") {
          await conn.sendStatusMentions(
            {
              image: { url: memek },
              fauzi
            },
            jids
          );
    
          m.reply(`✅ Status berhasil dikirim dan mention ke: ${jids.map(j => `@${j.split("@")[0]}`).join(", ")}`, m.chat, {
            mentions: jids
          });
        } else {
          m.reply("Baileys kamu belum mendukung `sendStatusMentions()`. Perbarui Baileys atau aktifkan fitur Status API.");
        }
      } catch (err) {
        m.reply("❌ Gagal mengirim status mention.\n" + String(err?.message || err));
      }
      }
      break;
      
      case 'button':
      {
      await conn.sendMessage( 
    m.chat, 
    { 
       text: 'hii',
       interactiveButtons: [ 
          {
             name: 'payment_info', 
             buttonParamsJson: JSON.stringify({ 
                payment_settings: [{ 
                   type: "pix_static_code", 
                   pix_static_code:  { 
                      merchant_name: 'SH - Fauzialifatah✨', 
                      key: 'XIXIXIXIXIXI', 
                      key_type: 'EVP'
                   } 
               }] 
            }) 
         },
      ], 
   } 
)
}
break

case 'bot': {
await conn.sendMessage(m.chat, {
  requestPhoneNumber: {}
})
}
break


      default:
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
  console.log(chalk.redBright(`\n📦 File ${file} berubah, auto relog bot...`));
  spawn(process.argv[0], [file], { stdio: "inherit" });
  process.exit();
});