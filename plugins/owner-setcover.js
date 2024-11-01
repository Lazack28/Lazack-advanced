module.exports = {
  run: async (m, { conn, Scraper, Func }) => {
    try {
      let setting = global.db.data.setting
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (!/image/.test(mime)) return conn.reply(m.chat, Func.texted('bold', `Image not found.`), m)
      m.react('🕒')
      let img = await q.download()
      if (!img) return conn.reply(m.chat, global.status.wrong, m)
      let link = await Scraper.uploadImage(img)
      if (!link.status) return m.reply(Func.jsonFormat(link))
      setting.cover = link.data.url
      conn.reply(m.chat, Func.texted('bold', `Cover successfully set.`), m)
    } catch (e) {
      return conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  help: ['setcover'],
  use: 'reply foto',
  tags: ['owner'],
  command: /^(setcover|cover)$/i,
  owner: true
}