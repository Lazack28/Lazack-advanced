let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply('Masukkan teks')
  let q = m.quoted ? m.quoted : m
  if (!q.fromMe) return m.reply('Itu bukan pesan dari bot')
  await conn.sendMessage(m.chat, { text: text, edit: q })
}
handler.help = handler.command = ['edit']
handler.tags = ['tools']
handler.premium = true

module.exports = handler