let { proto } = require('@whiskeysockets/baileys')
let handler = async (m, { conn, command, usedPrefix, text }) => {
  let M = proto.WebMessageInfo
  let which = command.replace(/add/i, '')
  if (!m.quoted) return m.reply(`Reply to a message with a command *${usedPrefix + command}*`)
  if (!text) return m.reply(`Pengunaan:${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`)
  let msgs = db.data.msgs
  if (text in msgs) return m.reply(`'${text}' telah terdaftar!`)
  msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
  if (db.data.chats[m.chat].getmsg) return m.reply(`Berhasil menambahkan pesan '${text}' Access by typing their name`.trim())
  else return await conn.reply(m.chat, `Successfully add a message '${text}'\n\nnaccess with ${usedPrefix}get${which} ${text}`, m)
}
handler.help = ['vn', 'msg', 'video', 'audio', 'img', 'stiker', 'gif'].map(v => 'add' + v + '')
handler.tags = ['database']
handler.command = /^add(vn|msg|video|audio|img|stic?ker|gif)$/

module.exports = handler