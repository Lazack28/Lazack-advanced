let loli = new (require('@fainshe/scrapers'))

let handler = async (m, { usedPrefix, command, args, Func }) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://vt.tiktok.com/ZSYaEoF55'))
  if (!args[0].match('tiktok.com')) return m.reply(global.status.invalid)
  m.react('🕐')
  try {
    let lolii = await loli.tt(args[0]);
    let old = new Date()
    if (lolii.data.images) {
      for (let x of lolii.data.images) {
        await conn.sendFile(m.chat, x, Func.filename('jpg'), '', m);
      }
    } else {
      let teks = `*[ Tiktok Downloader ]*\n\n`
      teks += `*-* *ID* : ${lolii.data.id || "Tidak ada"}\n`
      teks += `*-* *Region* : ${lolii.data.region || "Tidak ada"}\n`
      teks += `*-* *Name* : ${lolii.data.author.nickname || "Tidak ada"}\n`
      teks += `*-* *User Name* : ${lolii.data.author.unique_id || "Tidak ada"}\n`
      teks += `*-* *Duration* : ${lolii.data.duration || "Tidak ada"} Second\n`
      teks += `*-* *Plays* : ${lolii.data.play_count || "Tidak ada"}\n`
      teks += `*-* *Comments* : ${lolii.data.comment_count || "Tidak ada"}\n`
      teks += `*-* *Shared* : ${lolii.data.share_count || "Tidak ada"}\n`
      teks += `*-* *Downloads* : ${lolii.data.download_count || "Tidak ada"}\n`
      teks += `*-* *Title* : ${lolii.data.title || "Tidak ada"}\n`      
      teks += `*-* *Fetching* : ${((new Date - old) * 1)} ms\n\n`
      teks += global.footer 
      const sd_tt = await lolii.data.play;
      const ttvideo = await conn.sendFile(m.chat, "https://www.tikwm.com" + sd_tt, Func.filename('mp4'), teks, m);
      const aud_tt = await lolii.data.music_info;
      conn.sendFile(m.chat, aud_tt.play, Func.filename('mp3'), '', ttvideo);
    }
  } catch (e) {
    console.log(e)
    return m.reply('Fitur ini sedang eror!, Gunakan *tiktokv2* untuk mendownload')
  }
};
handler.help = ['tiktok', 'tiktokslide'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.command = ['tiktok', 'tt', 'ttslide', 'tiktokslide']
handler.limit = 4;

module.exports = handler;