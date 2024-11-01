const decode = require('html-entities').decode

module.exports = {
  run: async (m, { conn, usedPrefix, command, args, users, env, Func }) => {
    if (!args || !args[0]) return conn.reply(m.chat, Func.example(usedPrefix, command, 'https://www.mediafire.com/file/c2fyjyrfckwgkum/ZETSv1%25282%2529.zip/file'), m)
    if (!args[0].match(/(https:\/\/www.mediafire.com\/)/gi)) return conn.reply(m.chat, global.status.invalid, m)
    m.react('🕐')
    try {
      let anu = await Apic.get('api/mediafire', { url: args[0] })
      if (!anu.status) return m.reply(Func.jsonFormat(anu))
      let old = new Date()
      let ca = `*[ MEDIAFIRE ]*\n\n`
      ca += `*-* *Name* : ` + anu.data.response.filename + '\n'
      ca += `*-* *Size* : ` + anu.data.response.filesize + '\n'
      ca += `*-* *Type* : ` + anu.data.response.filetype + '\n'
      ca += `*-* *Mime* : ` + anu.data.response.desc + '\n'
      ca += `*-* *Upload* : ` + anu.data.response.uploadAt + '\n'
      ca += `*-* *Fetching* : ` + `${((new Date - old) * 1)} ms` + '\n\n'
      ca += global.footer
      const chSize = Func.sizeLimit(anu.data.response.filesize, users.premium ? env.max_upload : env.max_upload_free)
      const isOver = users.premium ? `💀 File size (${anu.data.response.filesize}) exceeds the maximum limit.` : `⚠️ File size (${anu.data.response.filesize}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
      if (chSize.oversize) return conn.reply(m.chat, isOver, m)
      conn.sendMessageModify(m.chat, ca, m, { largeThumb: true, thumbnail: 'https://telegra.ph/file/98417f85e45f3cae84bee.jpg'}).then(async () => {
        conn.sendFile(m.chat, anu.data.response.link, unescape(decode(anu.data.response.filename)), '', m)
      })
    } catch (e) {
      console.log(e)
      return m.reply(e)
    }
  },
  help: ['mediafire'],
  use: 'link',
  tags: ['downloader'],
  command: /^(mediafire|mf)$/i,
  limit: true
}