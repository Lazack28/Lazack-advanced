module.exports = {
   run: async (m, {
      conn,
      usedPrefix,
      command,
      Func
   }) => {
      conn.riddles = conn.riddles ? conn.riddles : {}
      let id = m.chat
      let timeout = 120000
      let points = Func.randomInt('1000', '50000')
      
      if (command == 'riddle') {
         if (id in conn.riddles) return conn.reply(m.chat, 'There is still an unanswered riddle in this chat', conn.riddles[id][0])
         
         let src = await Func.fetchJson('https://raw.githubusercontent.com/qisyana/scrape/main/riddles.json')
         let json = src[Math.floor(Math.random() * src.length)]
         let message = `– *Riddle*\n\n`
         message += `${json.question}\n\n`
         message += `Timeout : ${timeout / 60 / 1000} minutes\n`
         message += `Reply to this message to answer, send ${usedPrefix}hint for a hint`
         
         conn.riddles[id] = [
            await conn.reply(m.chat, message, m),
            json,
            points,
            setTimeout(() => {
               if (conn.riddles[id]) conn.reply(m.chat, `Time's up!\nThe answer is *${json.answer}*`, conn.riddles[id][0])
               delete conn.riddles[id]
            }, timeout)
         ]
      } else if (command == 'hint') {
         if (!(id in conn.riddles)) throw false
         let clue = conn.riddles[id][1].answer.replace(/[AIUEOaiueo]/g, '_')
         conn.reply(m.chat, '```' + clue + '```\nReply to the riddle, not this message', conn.riddles[id][0])
      }
   },
   help: ['riddle'],
   tags: ['game'],
   command: /^(riddle|hint)$/i,
   group: true,
   game: true,
   limit: true
}