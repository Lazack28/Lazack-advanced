const cp = require('child_process');
const util = require('util');

const exec = util.promisify(cp.exec);
const handler = async (m, { conn, text }) => {
  // Check if text is provided
  if (!text) return m.reply('Please enter a hostname name');
  
  try {
    // Ensure the command is executed by the owner
    if (global.conn.user.jid == conn.user.jid) {
      const command = 'hostnamectl set-hostname ';
      // Execute the command to set the hostname
      await exec(command + text);
      await m.reply(`Successfully changed the hostname to *${text}*`);
    }
  } catch (e) {
    return m.reply(global.status.error); // Send error status if something goes wrong
  }
};

// Define command and help information
handler.help = handler.command = ['hostname'];
handler.tags = ['owner'];
handler.owner = true;

module.exports = handler;