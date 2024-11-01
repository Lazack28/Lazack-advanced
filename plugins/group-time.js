let handler = async (m, { conn, args, text, usedPrefix: _p, command, isROwner }) => {
  switch (command) {
    case 'closetime': {
      if (args[1] == 'second') {
        var timer = args[0] * 1000
      } else if (args[1] == 'minute') {
        var timer = args[0] * 60000
      } else if (args[1] == 'hour') {
        var timer = args[0] * 3600000
      } else if (args[1] == 'day') {
        var timer = args[0] * 86400000
      } else {
        return conn.reply(m.chat, '*Example :* .closetime 10 second', m)
      }
      conn.reply(m.chat, `Close Time ${args[0]} ${args[1]} Starting from now`, m)
      setTimeout(() => {
        const close = `*On time* Group Closed By Admin\nNow Only Admins Can Send Messages`
        conn.groupSettingUpdate(m.chat, 'announcement')
        conn.reply(m.chat, close, m)
      }, timer)
    }
    break
    case 'opentime': {
      if (args[1] == 'second') {
        var timer = args[0] * 1000
      } else if (args[1] == 'minute') {
        var timer = args[0] * 60000
      } else if (args[1] == 'hour') {
        var timer = args[0] * 3600000
      } else if (args[1] == 'day') {
        var timer = args[0] * 86400000
      } else {
        return conn.reply(m.chat, '*Example :* .opentime 10 second', m)
      }
      conn.reply(m.chat, `Open Time ${args[0]} ${args[1]} Starting from now`, m)
      setTimeout(() => {
        const close = `*On time* Group Open By Admin\nNow All Participants Can Send Messages`
        conn.groupSettingUpdate(m.chat, 'announcement')
        conn.reply(m.chat, close, m)
      }, timer)
    }
    break
  }
}
handler.help = handler.command = ["closetime", "opentime"]
handler.tags = ['group']
handler.admin = handler.botAdmin = handler.group = true

module.exports = handler