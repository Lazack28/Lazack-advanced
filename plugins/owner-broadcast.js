module.exports = {
  run: async (m, { conn, usedPrefix, command, text, Func }) => {
    try {
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      let filteredNumbers = Object.keys(global.db.data.chats).filter(key => key.includes('s.whatsapp.net'));  // Hanya filter kunci yang mengandung 's.whatsapp.net'
      let chatJid = filteredNumbers
      let groupList = async () => Object.entries(await conn.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let groupJid = await (await groupList()).map(v => v.id)
      const id = command == 'bc' ? chatJid : groupJid
      if (id.length == 0) return conn.reply(m.chat, Func.texted('bold', `Error, ID does not exist.`), m)
      m.react('🕒')
      if (text) {
        for (let jid of id) {
          await Func.delay(1500)
          await conn.sendMessageModify(jid, '*[ BROADCAST ]*\n\n' + text, null, {
            thumbnail: await Func.fetchBuffer('https://telegra.ph/file/8f596150db8a717779271.jpg'),
            largeThumb: true,
            url: global.db.data.setting.link,
            mentions: command == 'bcgc' ? await (await conn.groupMetadata(jid)).participants.map(v => v.id) : []
          })
        }
        conn.reply(m.chat, Func.texted('bold', `Successfully send broadcast message to ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
      } else if (/image\/(webp)/.test(mime)) {
        for (let jid of id) {
          await Func.delay(1500)
          let media = await q.download()
          await conn.sendSticker(jid, media, null, {
            packname: global.db.data.setting.sk_pack,
            author: global.db.data.setting.sk_author,
            mentions: command == 'bcgc' ? await (await conn.groupMetadata(jid)).participants.map(v => v.id) : []
          })
        }
        conn.reply(m.chat, Func.texted('bold', `Successfully send broadcast message to ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
      } else if (/video|image\/(jpe?g|png)/.test(mime)) {
        for (let jid of id) {
          await Func.delay(1500)
          let media = await q.download()
          await conn.sendFile(jid, media, '', q.text ? '*[ BROADCAST ]*\n\n' + q.text : '', null, null,
            command == 'bcgc' ? {
              contextInfo: {
                mentionedJid: await (await conn.groupMetadata(jid)).participants.map(v => v.id)
              }
            } : {})
        }
        conn.reply(m.chat, Func.texted('bold', `Successfully send broadcast message to ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
      } else if (/audio/.test(mime)) {
        for (let jid of id) {
          await Func.delay(1500)
          let media = await q.download()
          await conn.sendFile(jid, media, '', '', null, null,
            command == 'bcgc' ? {
              ptt: q.ptt,
              contextInfo: {
                mentionedJid: await (await conn.groupMetadata(jid)).participants.map(v => v.id)
              }
            } : {})
        }
        conn.reply(m.chat, Func.texted('bold', `Successfully send broadcast message to ${id.length} ${command == 'bc' ? 'chats' : 'groups'}`), m)
      } else conn.reply(m.chat, Func.texted('bold', `Media / text not found or media is not supported.`), m)
    } catch (e) {
      conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  help: ['bc', 'bcgc'],
  use: 'text or reply media',
  tags: ['owner'],
  command: /^(bc|bcgc)$/i,
  owner: true
}