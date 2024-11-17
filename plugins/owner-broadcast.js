module.exports = {
  run: async (m, { conn, usedPrefix, command, text, Func }) => {
    try {
      let q = m.quoted ? m.quoted : m;
      let mime = (q.msg || q).mimetype || '';
      let filteredNumbers = Object.keys(global.db.data.chats).filter(key => key.includes('s.whatsapp.net'));
      let chatJid = filteredNumbers;
      let groupList = async () => Object.entries(await conn.groupFetchAllParticipating()).slice(0).map(entry => entry[1]);
      let groupJid = await (await groupList()).map(v => v.id);
      const id = command == 'bc' ? chatJid : groupJid;

      if (id.length == 0) return conn.reply(m.chat, Func.texted('bold', `Error, ID does not exist.`), m);
      m.react('🕒');

      const sendMessage = async (jid, message) => {
        try {
          await Func.delay(2000); // Increase delay to 2 seconds
          await conn.sendMessageModify(jid, message, null, {
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/8f596150db8a717779271.jpg'),
            largeThumb: true,
            url: global.db.data.setting.link,
            mentions: command == 'bcgc' ? await (await conn.groupMetadata(jid)).participants.map(v => v.id) : []
          });
        } catch (e) {
          if (e.message && e.message.includes('rate limit')) {
            console.log('Rate limit hit, waiting before retrying...');
            await Func.delay(10000); // Wait for 10 seconds before retrying
            await sendMessage(jid, message); // Retry sending the message
          } else {
            throw e; // Re-throw other errors
          }
        }
      };

      if (text) {
        for (let jid of id) {
          await sendMessage(jid, '*[ BROADCAST ]*\n\n' + text);
        }
        conn.reply(m.chat, Func.texted('bold', `Successfully sent broadcast message to ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m);
      } else if (/image\/(webp)/.test(mime)) {
        for (let jid of id) {
          let media = await q.download();
          await conn.sendSticker(jid, media, null, {
            packname: global.db.data.setting.sk_pack,
            author: global.db.data.setting.sk_author,
            mentions: command == 'bcgc' ? await (await conn.groupMetadata(jid)).participants.map(v => v.id) : []
          });
          await Func.delay(2000); // Delay after sending sticker
        }
        conn.reply(m.chat, Func.texted('bold', `Successfully sent broadcast message to ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m);
      } else if (/video|image\/(jpe?g|png)/.test(mime)) {
        for (let jid of id) {
          let media = await q.download();
          await conn.sendFile(jid, media, '', q.text ? '*[ BROADCAST ]*\n\n' + q.text : '', null, null,
            command == 'bcgc' ? {
              contextInfo: {
                mentionedJid: await (await conn.groupMetadata(jid)).participants.map(v => v.id)
              }
            } : {});
          await Func.delay(2000); // Delay after sending file
        }
        conn.reply(m.chat, Func.texted('bold', `Successfully sent broadcast message to ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m);
      } else if (/audio/.test(mime)) {
        for (let jid of id) {
          let media = await q.download();
          await conn.sendFile(jid, media, '', '', null, null,
            command == 'bcgc' ? {
              ptt: q.ptt,
              contextInfo: {
                mentionedJid: await (await conn.groupMetadata(jid)).participants.map (v => v.id)
              }
            } : {});
          await Func.delay(2000); // Delay after sending audio
        }
        conn.reply(m.chat, Func.texted('bold', `Successfully sent broadcast message to ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m);
      } else {
        conn.reply(m.chat, Func.texted('bold', `Media / text not found or media is not supported.`), m);
      }
    } catch (e) {
      conn.reply(m.chat, Func.jsonFormat(e), m);
    }
  },
  help: ['bc', 'bcgc'],
  use: 'text or reply media',
  tags: ['owner'],
  command: /^(bc|bcgc)$/i,
  owner: true
}