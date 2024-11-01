let handler = async (m, { text, usedPrefix, command, Func }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, '@im-dims/wb'))
  m.react("🕒")
  try {
    let res = await Func.fetchJson(`http://registry.npmjs.com/-/v1/search?text=${text}`)
    let { objects } = res
    if (!objects.length) return m.reply(`Hasil pencarian dari "${text}" tidak ditemukan!`)
    let txt = objects.map(({ package: pkg }) => {
      return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description || 'Tidak ada deskripsi'}_`
    }).join('\n\n')
    m.reply(txt)
  } catch (err) {
    console.error(err)
    m.reply('Terjadi kesalahan saat melakukan pencarian.')
  }
}
handler.help = ['npmsearch']
handler.tags = ['tools']
handler.command = /^npmsearch$/i
handler.limit = true

module.exports = handler
