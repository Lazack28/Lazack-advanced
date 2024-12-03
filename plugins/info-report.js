let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `Please enter your report\n\nExample: ${usedPrefix + command} Report user sending pornographic photos, please take action.`, m)
    if (text.length > 300) return conn.reply(m.chat, 'Sorry, the text is too long. Maximum 300 characters.', m)
    const teks1 = `*[ REPORT ]*\nNumber: wa.me/${m.sender.split("@s.whatsapp.net")[0]}\nMessage: ${text}`
    conn.reply(owner[0] + '@s.whatsapp.net', teks1, m)
    conn.reply(m.chat, 'The issue has been successfully sent to the Owner', m)
  }
  handler.help = handler.command = ['report']
  handler.tags = ['info']
  handler.private = true
  
  module.exports = handler