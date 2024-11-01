const cp = require('child_process');
const util = require('util');

const exec = util.promisify(cp.exec);
const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Masukan nama hostname');
  try {
    if (global.conn.user.jid == conn.user.jid) {
      const teks = 'hostnamectl set-hostname ';
      await exec(teks + text);
      await m.reply(`Sukses mengganti nama hostname ke *${text}*`);
    }
  } catch (e) {
    return m.reply(global.status.error);
  }
};
handler.help = handler.command = ['hostname'];
handler.tags = ['owner'];
handler.owner = true;

module.exports = handler;