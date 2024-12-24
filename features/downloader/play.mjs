import yts from "yt-search"
import axios from "axios"

const handle = {
  miyxious: ["play", "music"],
  category: "#downloader",
  describe: "Search for your favorite songs in this feature",
  run: async (m, { q, d, conn, text, repl, Func }) => {
    try {
      if (!text) return repl(Func.example(m.preff, m.command, 'Yoasobi Idol'))
      repl(q.wait)
      let nok = await yts(text)
      let lot = nok    
      let old = new Date()
      const response = await axios.post("https://cobalt.siputzx.my.id/", {
        url: lot.all[0].url,
        downloadMode: "audio",
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
      let teks = `⼷ *YouTube Play*\n\n`
      teks += `◎ *Title* : ` + lot.all[0].title + '\n'
      teks += `◎ *Author* : ` + lot.all[0].author.name + '\n'
      teks += `◎ *Duration* : ` + lot.all[0].timestamp + '\n'
      teks += `◎ *Video ID* : ` + lot.all[0].videoId + '\n'
      teks += `◎ *Published* : ` + lot.all[0].ago + '\n'
      teks += `◎ *Views* : ` + lot.all[0].views  + '\n'
      teks += `◎ *Url* : ` + lot.all[0].url + '\n'
      teks += `◎ *Fetching* : ` + `${((new Date - old) * 1)} ms\n\n`
      teks += q.footer
      let duration = lot.all[0].timestamp
      let durationParts = duration.split(':').map(v => parseInt(v))
      let totalSeconds = 0
      if (durationParts.length === 3) {
        totalSeconds = durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
      } else if (durationParts.length === 2) {
        totalSeconds = durationParts[0] * 60 + durationParts[1]
      }
      if (totalSeconds > 3600) return repl('Sorry, the audio duration exceeds 1 hour. Please search for a song with a shorter duration.')
      conn.sendteks(m.chat, teks, m, 
        d.f2(lot.all[0].title, nok.all[0].thumbnail, lot.all[0].url)
      ).then(async () => {
        await conn.sendMessage(m.chat, { 
          audio: { url: response.data.url }, 
          fileName: lot.all[0].title + '.mp3',
          mimetype: 'audio/mpeg', 
          contextInfo: { 
            externalAdReply: {
              showAdAttribution: true,
              mediaUrl: lot.all[0].url,
              mediaType: 1,
              title: lot.all[0].title,
              body: 'Duration : ' + lot.all[0].timestamp,
              thumbnail: await Func.fetchBuffer(nok.all[0].thumbnail || "https://home.lazackorganisation.my.id/img/img1.jpg"),
              sourceUrl: lot.all[0].url
            }
          } 
        }, { quoted: m })
      })
    } catch (err) {
      console.log(err)
      return repl(Func.jsonFormat(err))
    }
  }
}

export default handle