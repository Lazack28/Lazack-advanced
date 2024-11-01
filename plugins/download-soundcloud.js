let handler = async (m, { conn, args, usedPrefix, command, Func }) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://soundcloud.com/doom-official-45631102/dj-asmalibrasi'))
  if (!args[0].match('soundcloud.com')) return m.reply(global.status.invalid)
  m.react("🕒")
  try {
    let loli = await Func.fetchJson(API('bt', '/soundcloud', { url: args[0] }))
    let old = new Date()
    let teks = `*[ SOUNDCLOUD ]*\n\n`
    teks += `*-* *Title* : ` + loli.result.title + '\n'
    teks += `*-* *Author* : ` + loli.result.author.username + '\n'
    teks += `*-* *Likes* : ` + loli.result.author.likes_count + '\n'
    teks += `*-* *Comments* : ` + loli.result.author.comments_count + '\n'
    teks += `*-* *Description* : ` + loli.result.author.description + '\n'
    teks += `*-* *Created At* : ` + loli.result.author.created_at + '\n'
    teks += `*-* *Fetching* : ` + `${((new Date - old) * 1)} ms`
    conn.reply(m.chat, teks, m).then(async () => {
      conn.sendMessage(m.chat, { audio: { url: loli.result.url }, mimetype: 'audio/mpeg', fileName: loli.result.title + '.mp3', ptt: false }, { quoted: m })
    })
  } catch (e) {
    return m.reply(global.status.error)
  }
}
handler.help = ['soundcloud'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.command = ['soundcloud']
handler.limit = true

module.exports = handler