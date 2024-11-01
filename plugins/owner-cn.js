module.exports = {
  run: async (m, { conn, usedPrefix, command, text, Func }) => {
    try {
      if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, 'mari bot'), m)
      if (text.length > 25) return conn.reply(m.chat, `Text is too long, maximum 25 characters.`, m)
      conn.authState.creds.me.name = text
      await global.db.write()
      return conn.reply(m.chat, `Name successfully changed.`, m)
    } catch {
      return conn.reply(m.chat, Func.texted('bold', `Name failed to change.`), m)
    }
  },
  help: ['changename'],
  use: 'name',
  tags: ['owner'],
  command: /^(changename|cn)$/i,
  owner: true
}