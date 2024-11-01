const os = require('os');

module.exports = {
  run: async (m, { conn, Func }) => {
    try {
      const json = await Func.fetchJson('http://ip-api.com/json');
      delete json.status;
      delete json.query;
      let caption = `*[ SERVER ]*\n\n`;
      caption += `*-* OS : ${os.type()} (${os.arch()} / ${os.release()})\n`;
      caption += `*-* Ram : ${Func.formatSize(process.memoryUsage().rss)} / ${Func.formatSize(os.totalmem())}\n`;
      for (let key in json) {
        caption += `*-* ${Func.ucword(key)} : ${json[key]}\n`;
      }
      caption += `*-* Uptime : ${Func.toTime(os.uptime() * 1000)}\n`;
      caption += `*-* Processor : ${os.cpus()[0].model}\n\n`;
      caption += global.footer;
      conn.sendMessageModify(m.chat, caption, m, { largeThumb: true });
    } catch (e) {
      console.log(global.status.error);
    }
  },
  help: ['server'],
  tags: ['miscs'],
  command: /^(server)$/i,
};