let handler = async (m, { conn, text, participants}) => {
let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
if (!m.quoted) return m.reply(`Reply message with caption *.totag*`)
conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: users })
}
handler.help = ['totag']
handler.tags = ['group']
handler.command = /^(totag|tag)$/i
handler.admin = handler.group = true

module.exports = handler