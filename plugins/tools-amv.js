const loli = new (require('@fainshe/scrapers'))

module.exports = {
  run: async (m, { conn, Func }) => {
    m.react('🕒')
    let anu = await Func.random(['Lazack_28', 'Lazack_MD', 'stance_king8.8a', 'senegalreekk'])
    let search = await loli.tiktokSearch(anu)
    conn.sendFile(m.chat, search.result.media.nowm, 'amv.mp4', search.result.title, m)
  },
  help: ['amv'],
  tags: ['tools'],
  command: /^(amv|storyanime)$/i
}