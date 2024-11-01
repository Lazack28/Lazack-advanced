let handler = async (m, { usedPrefix, command, args, Func }) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://www.instagram.com/reel/C8em8oaBWG4/?igsh=M20weThtamoxOWkw'))
  if (!args[0].match('instagram.com')) return m.reply(global.status.invalid)
  m.react('🕐')
  try {
    let anu = await Func.fetchJson(API('bt', '/download/igdl', { url: args[0] }))
    if (!anu.status) return m.reply(Func.jsonFormat(anu))
    let old = new Date() 
    if (command == 'igs') {
      for (let i of anu.result) {
        conn.sendMessage(m.chat, { image: { url: i.url }, caption: "" }, { quoted: m })
        await Func.delay(1500)
      }
    } else if (command == 'ig') {
      for (let i of anu.result) {
        conn.sendMessage(m.chat, { video: { url: i.url }, caption: "" }, { quoted: m })
        await Func.delay(1500)
      }
    }
  } catch (e) {
    console.log(e)
    return m.reply(e)
  }
}
handler.help = ['igs', 'ig'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.command = ['igs', 'ig']
handler.limit = 4

module.exports = handler