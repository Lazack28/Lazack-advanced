const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

module.exports = {
  run: async (m, { conn, usedPrefix, command, text, Func }) => {
    try {
      let user = global.db.data.users[m.sender]
      if (user.registered === true) return conn.reply(m.chat, Func.texted('bold', 'Your number is already registered'), m)
      if (!Reg.test(text)) return conn.reply(m.chat, Func.example(usedPrefix, command, 'mari.15'), m)
      let [_, name, splitter, age] = text.match(Reg)
      if (!name) return conn.reply(m.chat, Func.texted('bold', 'Enter your name'), m)
      if (!age) return conn.reply(m.chat, Func.texted('bold', 'Enter your age'), m)
      age = parseInt(age)
      if (name.length > 20) return conn.reply(m.chat, Func.texted('bold', 'Name is too long'), m)
      if (age > 80) return conn.reply(m.chat, Func.texted('bold', 'Age is too old'), m)
      if (age < 5) return conn.reply(m.chat, Func.texted('bold', 'Ajg bayi bisa ngetik cok'), m)
      user.name = name.trim()
      user.age = age
      user.regTime = +new Date()
      user.registered = true
      user.limit += 100
      user.exp += 20000
      user.money += 10000
      let sn = createHash('md5').update(m.sender).digest('hex')
      let capt = `*Registered successfully*\n\n`
      capt += ` ∘ Name : ${name}\n`
      capt += ` ∘ Age : ${age}\n`
      capt += ` ∘ SN : ${sn}\n\n`
      capt += `*Congratulations you got a prize!*\n`
      capt += `+ 100 limit\n`
      capt += `+ 20.000 exp\n`
      capt += `+ 10.000 money\n`
      conn.reply(m.chat, capt, m)
    } catch (e) {
      console.log(e)
    }
  },
  help: ['reg'],
  use: 'name.age',
  tags: ['user'],
  command: /^(reg)$/i
}