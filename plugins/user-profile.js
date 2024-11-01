module.exports = {
  run: async (m, { conn, text, blockList, env, Func }) => {
    let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@`[1]) : text
    if (!text && !m.quoted) return conn.reply(m.chat, Func.texted('bold', `Mention or Reply chat target.`), m)
    if (isNaN(number)) return conn.reply(m.chat, Func.texted('bold', `Invalid number.`), m)
    if (number.length > 15) return conn.reply(m.chat, Func.texted('bold', `Invalid format.`), m)
    var pic = './src/image/default.png'
    try {
      if (text) {
        var user = number + '@s.whatsapp.net'
      } else if (m.quoted.sender) {
        var user = m.quoted.sender
      } else if (m.mentionedJid) {
        var user = number + '@s.whatsapp.net'
      }
    } catch (e) { 
    } finally {
      let target = global.db.data.users[user]
      if (typeof target == 'undefined') return conn.reply(m.chat, Func.texted('bold', `Can't find user data.`), m)
      try {
        var pic = await Func.fetchBuffer(await conn.profilePictureUrl(user, 'image'))
      } catch (e) { 
      } finally {
        let blocked = blockList.includes(user) ? true : false
        let now = new Date() * 1
        let lastseen = (target.lastseen == 0) ? 'Never' : Func.toDate(now - target.lastseen)
        let usebot = (target.usebot == 0) ? 'Never' : Func.toDate(now - target.usebot)
        let caption = `*[ USER PROFILE ]*\n\n`
        caption += `*-* *Name* : ${target.name}\n`
        caption += `*-* *Exp* : ${Func.formatNumber(target.exp)}\n`
        caption += `*-* *Money* : ${Func.formatNumber(target.money)}\n`
        caption += `*-* *Limit* : ${Func.formatNumber(target.limit)}\n`
        caption += `*-* *Hitstat* : ${Func.formatNumber(target.hit)}\n`
        caption += `*-* *Warning* : ${((m.isGroup) ? (typeof global.db.data.groups[m.chat].member[user] != 'undefined' ? global.db.data.groups[m.chat].member[user].warning : 0) + ' / 5' : target.warning + ' / 5')}\n\n`
        caption += `*[ USER STATUS ]*\n\n`
        caption += `*-* *Blocked* : ${(blocked ? '√' : '×')}\n`
        caption += `*-* *Banned* : ${(new Date - target.ban_temporary < env.timer) ? Func.toTime(new Date(target.ban_temporary + env.timeout) - new Date()) + ' (' + ((env.timeout / 1000) / 60) + ' min)' : target.banned ? '√' : '×'}\n`
        caption += `*-* *Use In Private* : ${(Object.keys(global.db.data.chats).includes(user) ? '√' : '×')}\n`
        caption += `*-* *Premium* : ${(target.premium ? '√' : '×')}\n`
        caption += `*-* *Expired* : ${target.expired == 0 ? '-' : Func.timeReverse(target.expired - new Date() * 1)}\n`
        caption += `*-* *Verified* : ${(target.registered ? '√' : '×')}\n\n`
        caption += global.footer
        conn.sendMessageModify(m.chat, caption, m, {
          largeThumb: true,
          thumbnail: pic
        })
      }
    }
  },
  help: ['profile'],
  use: 'mention or reply',
  tags: ['user'],
  command: /^(profile)$/i
}