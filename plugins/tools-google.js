const googleIt = require('google-it')

module.exports = {
  run: async (m, { conn, usedPrefix, command, text, Scraper, Func }) => {
    if (!text) return m.reply(Func.example(usedPrefix, command, 'Loli'))
    m.react('🕐')
    try {
      if (command == 'google') {
        let anu = await googleIt({ query: text })
        if (anu.length == 0) return m.reply('Tidak di temukan hasil.')
        
        if (['tetek', 'segs', 'hentai', 'bokep', 'tobrut', 'kontol', 'memek', 'pussy', 'cum', 'dick', 'fucking', 'blowjob', 'sex', 'sextoys', 'ngentot', 'ngewe', 'montok', 'ngocok', 'telanjang', '18+', 'penis', 'milf'].some(word => text.includes(word))) {
          return conn.reply(m.chat, Func.texted('bold', `Sorry sensei the search results you are looking for contain 18+`), m)
        }
        
        let txt = `*[ GOOGLE ]*\n\n`
        for (var x of anu) {
          txt += x.title + `\n`
          txt += `*-* *Snippet* : ` + x.snippet + '\n'
          txt += `*-* *Link* : ` + x.link + `\n`
          txt += `°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n`;
        }
        m.reply(txt)
      }
      if (command == 'gimage') {
        let loli = await Func.fetchJson(API('bt', '/googleimage', { query: text }))
        let jawa = await Func.random(loli.result)
        if (jawa.length == 0) return m.reply('Tidak di temukan hasil.')
    
        if (['tetek', 'segs', 'hentai', 'bokep', 'tobrut', 'kontol', 'memek', 'pussy', 'cum', 'dick', 'fucking', 'blowjob', 'sex', 'sextoys', 'ngentot', 'ngewe', 'montok', 'ngocok', 'telanjang', '18+', 'penis', 'milf'].some(word => text.includes(word))) {
          return conn.reply(m.chat, Func.texted('bold', `Sorry sensei the search results you are looking for contain 18+`), m)
        }
        
        conn.sendFile(m.chat, jawa, 'google.jpg', `Result from: ${text}`, m)
      }
    } catch (e) {
      console.log(e)
    }
  },
  help: ['google', 'gimage'],
  use: 'query',
  tags: ['tools'],
  command: /^(google|gimage)$/i,
  limit: true
}