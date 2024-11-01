let fetch = require("node-fetch")

let handler = async (m, { conn }) => {
  let block = await conn.fetchBlocklist()                    
  conn.reply(m.chat, '*Daftar List Yang Di Block*\n\n' + `Total: ${block == undefined ? '*0* Diblokir' : '*' + block.length + '* Diblokir'}\n` + block.map(v => '*-* @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: block })
}
handler.help = ['blocklist']
handler.tags = ['owner']
handler.command = /^listbloc?k|bloc?klist|daftarbloc?k|blocks$/i
handler.owner = true

module.exports = handler