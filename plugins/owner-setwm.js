module.exports = {
  run: async (m, { conn, usedPrefix, command, text, Func }) => {
    try {
      let setting = global.db.data.setting
      if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, 'Sticker by | © mari-wabot'), m)
      let [packname, ...author] = text.split`|`
      author = (author || []).join`|`
      setting.sk_pack = packname || ''
      setting.sk_author = author || ''
      conn.reply(m.chat, Func.texted('bold', `Sticker Watermark successfully set.`), m)
    } catch (e) {
      conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  help: ['setwm'],
  use: 'packname | author',
  tags: ['owner'],
  command: /^(setwm)$/i,
  owner: true
}