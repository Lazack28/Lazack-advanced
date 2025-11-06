

import {
  default as makeWASocket,
  useMultiFileAuthState,
  jidDecode,
  getContentType,
  DisconnectReason,
  generateWAMessage,
  areJidsSameUser,
  downloadContentFromMessage
} from "@whiskeysockets/baileys";
import axios from "axios";
import fs from "fs";
import fetch from "node-fetch";
import * as jimp from "jimp";
import fileType from "file-type";
const { fileTypeFromBuffer } = fileType;

async function downloadFromMessageContent(contentObj, mtype) {
  const typeMap = {
    imageMessage: "image",
    videoMessage: "video",
    stickerMessage: "sticker",
    documentMessage: "document",
    audioMessage: "audio"
  };
  const mediaKind = typeMap[mtype];
  if (!mediaKind) return null;
  const stream = await downloadContentFromMessage(contentObj, mediaKind);
  let buffer = Buffer.alloc(0);
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  return buffer;
}

export const smsg = (conn, m, store) => {
  if (!m || m.mtype === "protocolMessage" || m.mtype === "senderKeyDistributionMessage") {
    return m;
  }
  if (m.key) {
    m.id = m.key.id;
    m.isBaileys = m.id && m.id.startsWith("BAE5") && m.id.length === 16;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat ? m.chat.endsWith("@g.us") : false;
    m.sender = conn.decodeJid(
      (m.fromMe && conn.user.id) ||
      m.participant ||
      m.key.participant ||
      m.chat ||
      ""
    );
    if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || "";
  }
  if (m.message) {
    m.mtype = getContentType(m.message);
    m.msg = m.mtype === "viewOnceMessage"
      ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)]
      : m.message[m.mtype];

    m.body =
      m.message.conversation ||
      m.msg?.caption ||
      m.msg?.text ||
      (m.mtype === "listResponseMessage" && m.msg?.singleSelectReply?.selectedRowId) ||
      (m.mtype === "buttonsResponseMessage" && m.msg?.selectedButtonId) ||
      (m.mtype === "interactiveResponseMessage" && JSON.parse(m.msg.nativeFlowResponseMessage?.paramsJson || "{}")?.id) ||
      (m.mtype === "viewOnceMessage" && m.msg?.caption) ||
      m.text;

    let quoted = (m.quoted = m.msg?.contextInfo ? m.msg.contextInfo.quotedMessage : null);
    m.mentionedJid = m.msg?.contextInfo ? m.msg.contextInfo.mentionedJid : [];
    if (m.quoted) {
      let type = Object.keys(m.quoted)[0];
      m.quoted = m.quoted[type];
      if (type === "productMessage") {
        type = Object.keys(m.quoted)[0];
        m.quoted = m.quoted[type];
      }
      if (typeof m.quoted === "string") {
        m.quoted = { text: m.quoted };
      }
      m.quoted.mtype = type;
      m.quoted.id = m.msg.contextInfo.stanzaId;
      m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
      m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith("BAE5") && m.quoted.id.length === 16 : false;
      m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant);
      m.quoted.fromMe = m.quoted.sender === conn.decodeJid(conn.user.id);
      m.quoted.text =
        m.quoted.text ||
        m.quoted.caption ||
        m.quoted.conversation ||
        m.quoted.contentText ||
        m.quoted.selectedDisplayText ||
        m.quoted.title ||
        "";
      m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
      m.getQuotedObj = m.getQuotedMessage = async () => {
        if (!m.quoted.id) return false;
        const q = await store.loadMessage(m.chat, m.quoted.id, conn);
        return smsg(conn, q, store);
      };
      let vM = (m.quoted.fakeObj = JSON.parse(JSON.stringify(m)));
      m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key });
      m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options);
      m.quoted.download = async () => downloadFromMessageContent(m.quoted, type);
    }
  }
  if (m.msg?.url) m.download = async () => downloadFromMessageContent(m.msg, m.mtype);
  m.text =
    m.msg?.text ||
    m.msg?.caption ||
    m.message?.conversation ||
    m.msg?.contentText ||
    m.msg?.selectedDisplayText ||
    m.msg?.title ||
    "";

  m.reply = (text, chatId = m.chat, options = {}) => {
    if (Buffer.isBuffer(text)) {
      return conn.sendMedia(chatId, text, "file", "", m, { ...options });
    } else {
      let mentionIds = [];
      if (options.mentions) {
        mentionIds = options.mentions;
        delete options.mentions;
      }
      return conn.sendText(chatId, text, m, { mentions: mentionIds, ...options });
    }
  };

  m.copy = () => smsg(conn, JSON.parse(JSON.stringify(m)));
  m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options);
  conn.appenTextMessage = async (text, chatUpdate) => {
    let messages = await generateWAMessage(
      m.chat,
      { text: text, mentions: m.mentionedJid },
      { userJid: conn.user.id, quoted: m.quoted && m.quoted.fakeObj }
    );
    messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.pushName;
    if (m.isGroup) messages.participant = m.sender;
    let msg = { ...chatUpdate, messages: [messages], type: "append" };
    conn.ev.emit("messages.upsert", msg);
  };
  return m;
};

export const generateProfilePicture = async (buffer) => {
  const j1 = await jimp.read(buffer);
  const resized = j1.getWidth() > j1.getHeight() ? j1.resize(550, jimp.AUTO) : j1.resize(jimp.AUTO, 650);
  return { img: await resized.getBufferAsync(jimp.MIME_JPEG) };
};

export const resizeImage = async (buffer, width, height) => {
  try {
    const image = await jimp.read(buffer);
    const resizedImage = image.resize(width, height);
    const resultBuffer = await resizedImage.getBufferAsync(jimp.MIME_JPEG);
    return resultBuffer;
  } catch (error) {
    console.error("Gagal me-resize gambar:", error);
    return null;
  }
};

export const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

export const getBuffer = async (url, options) => {
  try {
    options = options ? options : {};
    const res = await axios({
      method: "get",
      url,
      headers: { DNT: 1, "Upgrade-Insecure-Request": 1 },
      ...options,
      responseType: "arraybuffer"
    });
    return res.data;
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

export const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
  fetch(url, options)
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(err => reject(err));
});

export const fetchText = (url, options) => new Promise(async (resolve, reject) => {
  fetch(url, options)
    .then(response => response.text())
    .then(text => resolve(text))
    .catch(err => reject(err));
});

export const getGroupAdmins = function (participants) {
  let admins = [];
  for (let i of participants) {
    if (i.admin !== null) admins.push(i.id);
  }
  return admins;
};

export const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

export const removeEmojis = (string) => {
  var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return string.replace(regex, "");
};

export const calculate_age = (dob) => {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);
  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

export const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const url = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, "gi"));
};

export const makeid = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

global.loadConnect = async function (t) {
  try {
    await t.newsletterFollow("120363404741298748@newsletter");
  } catch (e) {
    console.error("Gagal follow newsletter:", e);
  }
};