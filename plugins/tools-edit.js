let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Check if the user provided text to send
  if (!text) return m.reply('Please enter the text you want to send.');

  // Determine if the message is quoted or the original message
  let quotedMessage = m.quoted ? m.quoted : m;

  // Ensure the quoted message is from the bot
  if (!quotedMessage.fromMe) return m.reply('This message is not from the bot.');

  // Send the edited message
  await conn.sendMessage(m.chat, { text: text, edit: quotedMessage });
}

// Define the command and help information
handler.help = handler.command = ['edit'];
handler.tags = ['tools'];
handler.premium = true; // This command is for premium users only

module.exports = handler;