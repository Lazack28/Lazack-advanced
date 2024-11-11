module.exports = {
   run: async (m, {
      conn,
      usedPrefix,
      command,
      Func
   }) => {
      conn.guessLyrics = conn.guessLyrics ? conn.guessLyrics : {}
      let id = m.chat
      let timeout = 120000
      let points = Func.randomInt('1000', '50000')
      
      if (command == 'guesslyrics') {
         if (id in conn.guessLyrics) return conn.reply(m.chat, 'There is still an unanswered question in this chat', conn.guessLyrics[id][0])
         
         let res = await Func.fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/guesslyrics.json')
         let json = res[Math.floor(Math.random() * res.length)]
         
         let capt = `– *Guess the Lyrics*\n\n`
         capt += `${json.question}\n\n`
         capt += `Timeout: ${timeout / 60 / 1000} minutes\n`
         capt += `Reply to this message to answer, send ${usedPrefix}hint for help`
         
         conn.guessLyrics[id] = [
            await conn.reply(m.chat, capt, m),
            json,
            points,
            setTimeout(() => {
               if (conn.guessLyrics[id]) conn.reply(m.chat, `Time's up!\nThe answer is *${json.answer}*`, conn.guessLyrics[id][0])
               delete conn.guessLyrics[id]
            }, timeout)
         ]
      } else if (command == 'hint') {
         if (!(id in conn.guessLyrics)) throw false
         let clue = conn.guessLyrics[id][1].answer.replace(/[AIUEOaiueo]/g, '_')
         conn.reply(m.chat, '```' + clue + '```\nReply to the question, not this message', conn.guessLyrics[id][0])
      }
   },
   help: ['guesslyrics'],
   tags: ['game'],
   command: /^(guesslyrics|hint)$/i,
   group: true,
   game: true,
   limit: true
}