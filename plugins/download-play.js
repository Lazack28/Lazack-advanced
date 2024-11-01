const yts = require('yt-search')

const handler = async (m, { conn, text, usedPrefix, command, Func }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'Yoasobi idol'))
  m.reply(global.status.wait)
  try {
    let nok = await yts(text)
    let lot = nok
    let old = new Date()
    let teks = `*[ YOUTUBE PLAY ]*\n\n`
    teks += `*-* *Title* : ` + lot.all[0].title + '\n'
    teks += `*-* *Author* : ` + lot.all[0].author.name + '\n'
    teks += `*-* *Video ID* : ` + lot.all[0].videoId + '\n'
    teks += `*-* *Published* : ` + lot.all[0].ago + '\n'
    teks += `*-* *Views* : ` + lot.all[0].views  + '\n'
    teks += `*-* *Url* : ` + lot.all[0].url + '\n'
    teks += `*-* *Fetching* : ` + `${((new Date - old) * 1)} ms`
    const btns = [
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '🎶 Audio',
          id: `${usedPrefix}yta ${lot.videos[0].url}`
        })
      }, {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '🎥 Video',
          id: `${usedPrefix}ytv ${lot.videos[0].url}`
        })
      }, {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: '🔍 Search',
          id: `${usedPrefix}yts ${lot.videos[0].title}`
        })
      }
    ]
    conn.sendIAMessage(m.chat, btns, m, {
      content: teks,
      footer: global.footer,
      media: nok.all[0].thumbnail
    })
  } catch (err) {
    return m.reply(global.status.error)
  }
}
handler.help = ['play'].map(v => v + ' *title*')
handler.tags = ['downloader']
handler.command = ['play']
handler.limit = 3

module.exports = handler