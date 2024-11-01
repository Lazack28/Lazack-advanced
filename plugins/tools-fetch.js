const { format } = require("util");
const axios = require("axios");
const fetch = require("node-fetch");

let handler = async (m, { args, conn }) => {
  const text = args.length >= 1 ? args.join(" ") : (m.quoted && m.quoted.text) || "";
  if (!text) return m.reply(`Please provide a URL`);
  
  const urlRegex = /\b(https?:\/\/[^\s]+)/gi;
  const urlMatch = text.match(urlRegex);
  const url = urlMatch ? urlMatch[0].trim() : null;
  if (!url) return m.reply("Where is the url sensei?");

  let _url = new URL(url);
  let URl = global.API(
    _url.origin,
    _url.pathname,
    Object.fromEntries(_url.searchParams.entries()),
    "APIKEY",
  );
  
  let res;
  const head = text.includes("--head");
  if (head) {
    res = await axios.head(URl);
  } else {
  res = await fetch(URl);
  if (res.headers.get("content-length") > 100 * 1024 * 1024 * 1024) {
    throw `Content-Length: ${res.headers.get("content-length")}`;
  }
  }
  if (head) {
  m.reply(`${JSON.stringify(res.headers, null, 2)}`);
  } else {
  if (!/text|json/.test(res.headers.get("content-type")))
    return conn.sendFile(m.chat, url, "", text, m);
  let txt = await res.buffer();
  try {
    txt = format(JSON.parse(txt + ""));
  } catch (e) {
    txt = txt + "";
  } finally {
    m.reply(txt.slice(0, 65536) + "");
  }
 }
};
handler.help = ["get"];
handler.tags = ["tools"];
handler.command = ['fetch', 'get'];

module.exports = handler;