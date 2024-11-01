let handler = async (m, { usedPrefix, command, args, Func }) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://pin.it/2sofHzZ'))
 //if (!args[0].match('pin.it')) return m.reply(global.status.invalid)
  m.react('🕒')
  try {
    let { medias, title, duration } = await pindl(args[0])
    let old = new Date()
    let mp4 = medias.filter(v => v.extension == "mp4")
    let capt = `*[ PINTEREST DOWNLOADER ]*\n\n`
    capt += `*-* *Name* : ` + title + '\n'
    capt += `*-* *Quality* : ` + mp4[0].quality + '\n'
    capt += `*-* *Size* : ` + mp4[0].formattedSize + '\n'
    capt += `*-* *Duration* : ` + `${duration || 'Tidak ada'}` + '\n'
    capt += `*-* *Fetching* : ` + `${((new Date - old) * 1)} ms` + '\n\n'
    capt += global.footer
    if (mp4.length !== 0) {
      await conn.sendMessage(m.chat, { video: { url: mp4[0].url }, caption: capt }, { quoted: m })
    } else {
      await conn.sendFile(m.chat, medias[1].url, Func.filename('jpg'), capt, m)
    }
  } catch (e) {
    return m.reply(global.status.error)
  }
}
handler.help = handler.command = ['pindl']
handler.tags = ['downloader']

module.exports = handler

async function pindl(url) {
  try {
    const urls = 'https://pinterestdownloader.io/frontendService/DownloaderService'
    const params = {
      url
    }

    let { data } = await require('axios').get(urls, { params })
    return data
  } catch (e) {
    return {
      msg: e
    }
  }
}