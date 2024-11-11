const similarity = require('similarity')
const threshold = 0.72 // Similarity threshold

module.exports = {
   async before(m, {
      conn,
      users,
      Func
   }) {
      let id = m.chat
      conn.tekateki = conn.tekateki ? conn.tekateki : {} // Initialize tekateki if it doesn't exist

      // Check if the message is a reply and if the sender is not the bot itself
      if (m.quoted && m.quoted.sender != conn.decodeJid(conn.user.jid)) return

      // Check if the quoted message is asking for help with the riddle
      if (m.quoted && /tekki untuk bantuan/i.test(m.quoted.text)) {
         // If the riddle has ended or does not exist, send a message
         if (!(id in conn.tekateki) && /tekki untuk bantuan/i.test(m.quoted.text)) return m.reply('That riddle has ended')

         // Check if the quoted message ID matches the current riddle
         if (m.quoted.id == conn.tekateki[id][0].id) {
            // If the user's response is 'Timeout' or empty, do nothing
            if (['Timeout', ''].includes(m.text)) return !0

            // Clone the riddle data
            let json = JSON.parse(JSON.stringify(conn.tekateki[id][1]))

            // Check if the answer is correct
            if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
               await m.reply(`*Correct*, *+ ${Func.formatNumber(conn.tekateki[id][2])} Exp*`).then(() => {
                  users.exp += conn.tekateki[id][2] // Add experience points to the user
                  clearTimeout(conn.tekateki[id][3]) // Clear the timeout for the riddle
                  delete conn.tekateki[id] // Remove the riddle from the connection
               })
            } 
            // Check if the answer is similar but not exact
            else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
               m.reply(`*Almost there!*`) // Inform the user they are close
            } 
            // If the answer is incorrect
            else {
               m.reply(`*Incorrect!*`) // Inform the user the answer is wrong
            }
         }
      }
      return true // Return true to indicate successful processing
   }
}