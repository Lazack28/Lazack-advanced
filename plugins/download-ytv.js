const loli = require("node-yt-dl")

let handler = async (m, { conn, usedPrefix, command, args, Func }) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://youtube.com/watch?v=ZRtdQ81jPUQ'))
  if (!args[0].match('youtube.com')) return m.reply(global.status.invalid)
  m.react('🕒')
  try {
    let anu = await loli.mp4(args[0])
    conn.sendMessage(m.chat, { image: { url: anu.metadata.thumbnail }, caption: anu.title }, { quoted: m }).then(async () => {
      conn.sendMessage(m.chat, { video: { url: anu.media }, caption: '' }, { quoted: m }).then(async () => {
        conn.sendFile(m.chat, anu.media, anu.title + '.mp4', 'Here is the document version!', m, {
          document: true,
          APIC: await Func.fetchBuffer("https://telegra.ph/file/14648bf3119959bbfe434.jpg")
        }, {
          jpegThumbnail: await Func.createThumb("https://telegra.ph/file/14648bf3119959bbfe434.jpg")
        })
      })
    })
  } catch (e) {
    return m.reply(global.status.error)
  }
}
handler.help = ['ytv'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.command = ['ytv', 'ytm4', 'ytvideo']
handler.limit = true

module.exports = handler 