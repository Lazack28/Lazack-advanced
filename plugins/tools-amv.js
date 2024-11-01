const loli = new (require('@fainshe/scrapers'))

module.exports = {
  run: async (m, { conn, Func }) => {
    m.react('🕒')
    let anu = await Func.random(['inferiordom', 'blubz_amv', '.kumui', 'yow_ph'])
    let search = await loli.tiktokSearch(anu)
    conn.sendFile(m.chat, search.result.media.nowm, 'amv.mp4', search.result.title, m)
  },
  help: ['amv'],
  tags: ['tools'],
  command: /^(amv|storyanime)$/i
}