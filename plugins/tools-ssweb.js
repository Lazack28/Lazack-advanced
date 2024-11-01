let handler = async (m, { usedPrefix, command, text, Func }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'https://github.com/Im-Dims'))
  m.reply(global.status.wait)
  try {
    let loli = await Apic.get('api/ssweb', { url: text })
    conn.sendMessage(m.chat, { image: { url: loli }, caption: 'Nih' }, { quoted: m })
  } catch (e) {
    console.log(e)
    return m.reply(global.status.error)
  }
}
handler.help = handler.command = ['ssweb']
handler.tags = ['tools']
handler.limit = true

module.exports = handler