let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('Gawul')
if (!m.quoted) return m.reply('Balas pesannya!')
conn.relayMessage(m.chat, { reactionMessage: { key: { id: m.quoted.id, remoteJid: m.chat, fromMe: true }, text: text }}, { messageId: m.id })
}
handler.help = handler.command = ['react']
handler.tags = ['tools']

module.exports = handler