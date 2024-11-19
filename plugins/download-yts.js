const yts = require('yt-search');
const { download } = require('btch-downloader');

module.exports = {
  run: async (m, { conn, usedPrefix, command, text, users, env, Func }) => {
    try {
      conn.yts = conn.yts ? conn.yts : [];
      if (!text) {
        return conn.reply(m.chat, Func.example(usedPrefix, command, 'Yoasobi idol'), m);
      }
      const search = conn.yts.find(v => v.jid == m.sender);
      if (/mp3|mp4/.test(command) && !search && !isNaN(text)) {
        return m.reply(Func.texted('bold', 'Your session has expired / does not exist, do another search using the keywords you want.'));
      }
      if (/mp3|mp4/.test(command) && search && !isNaN(text)) {
        if (Number(text) > search.results.length) {
          return m.reply(Func.texted('bold', 'Exceed amount of data.'));
        }
        m.react('🕒');
        const videoUrl = search.results[Number(text) - 1];

        // Downloading using btch-downloader
        const mediaType = command === 'mp3' ? 'audio' : 'video';
        const downloadOptions = {
          url: videoUrl,
          format: mediaType,
        };

        const media = await download(downloadOptions);
        
        if (mediaType === 'audio') {
          conn.sendMessage(m.chat, { image: { url: media.thumbnail }, caption: media.title }, { quoted: m })
            .then(async () => {
              conn.sendMessage(m.chat, { audio: { url: media.url }, fileName: media.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m });
            });
        } else {
          conn.sendMessage(m.chat, { image: { url: media.thumbnail }, caption: media.title }, { quoted: m })
            .then(async () => {
              conn.sendMessage(m.chat, { video: { url: media.url }, caption: '' }, { quoted: m });
            });
        }
      } else {
        m.react('🕒');
        const yete = await (await yts(text)).all;
        if (!yete || yete.length < 1) {
          return conn.reply(m.chat, env.status.fail, m);
        }
        if (!search) {
          conn.yts.push({
            jid: m.sender,
            results: yete.map(v => v.url),
            created_at: new Date() * 1
          });
        } else {
          search.results = yete.map(v => v.url);
        }
        let teks = 'To get audio use *' + usedPrefix + 'mp3 number* and video use *' + usedPrefix + 'mp4 number*\n';
        teks += '*Example* : ' + usedPrefix + 'mp4 1\n\n';
        teks += '*[ YOUTUBE SEARCH ]*\n\n';
        yete.filter(v => v.type == 'video').map((anu, x) => {
          teks += '*' + (x + 1) + '*. ' + anu.title + '\n';
          teks += '*-* *Duration* : ' + anu.timestamp + '\n';
          teks += '*-* *Views* : ' + Func.h2k(anu.views) + '\n';
          teks += '*-* *Link* : ' + anu.url + '\n\n';
        }).join('\n\n');
        teks += global.footer;
        conn.reply(m.chat, teks, m);
      }
      setInterval(async () => {
        const files = conn.yts.find(v => v.jid == m.sender);
        if (files && new Date() - files.created_at > env.timer) {
          Func.removeItem(conn.yts, files);
        }
      }, 60000);
    } catch (e) {
      console.log(e);
      return m.reply(Func.jsonFormat(e));
    }
  },
  help: ['yts'],
  use: 'query',
  tags: ['downloader'],
  command: /^(yts|ytsearch|youtubesearch|mp3|mp4)$/i,
  limit: 5
};
