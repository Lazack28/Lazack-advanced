module.exports = {
  run: async (m, { conn, usedPrefix, command, text, env, Func }) => {
    try {
      let input = text ? text : m.quoted ? m.quoted.sender : m.mentionedJid.length > 0 ? m.mentioneJid[0] : false
      if (!input) return conn.reply(m.chat, Func.texted('bold', `Mention or reply chat target.`), m)
      let p = await conn.onWhatsApp(input.trim())
      if (p.length == 0) return conn.reply(m.chat, Func.texted('bold', `Invalid number.`), m)
      let jid = conn.decodeJid(p[0].jid)
      let number = jid.replace(/@.+/, '')
      if (command == '+owner') { // add owner number
        let owners = global.db.data.setting.owners
        if (owners.includes(number)) return conn.reply(m.chat, Func.texted('bold', `Target is already the owner.`), m)
        owners.push(number)
        conn.reply(m.chat, Func.texted('bold', `Successfully added @${number} as owner.`), m)
      } else if (command == '-owner') { // remove owner number
        let owners = global.db.data.setting.owners
        if (!owners.includes(number)) return conn.reply(m.chat, Func.texted('bold', `Target is not owner.`), m)
        owners.forEach((data, index) => {
          if (data === number) owners.splice(index, 1)
        })
        conn.reply(m.chat, Func.texted('bold', `Successfully removing @${number} from owner list.`), m)
      } else if (command == '-prem') { // remove premium
        let data = global.db.data.users[jid]
        if (typeof data == 'undefined') return conn.reply(m.chat, Func.texted('bold', `Can't find user data.`), m)
        if (!data.premium) return conn.reply(m.chat, Func.texted('bold', `Not a premium account.`), m)
        data.premium = false
        data.expired = 0
        conn.reply(m.chat, Func.texted('bold', `@${jid.replace(/@.+/, '')}'s premium status has been successfully deleted.`), m)
      } else if (command == 'block') { // block user
        if (jid == conn.decodeJid(conn.user.id)) return conn.reply(m.chat, Func.texted('bold', `??`), m)
        conn.updateBlockStatus(jid, 'block').then(res => m.reply(Func.jsonFormat(res)))
      } else if (command == 'unblock') { // unblock user
        conn.updateBlockStatus(jid, 'unblock').then(res => m.reply(Func.jsonFormat(res)))
      }
    } catch (e) {
      conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  help: ['+owner', '-owner', '-prem', 'block', 'unblock'],
  use: 'mention or reply',
  tags: ['owner'],
  command: /^(\+owner|\-owner|\-prem|block|unblock)$/i,
  owner: true
}