module.exports = {
  run: async (m, { conn, usedPrefix, command, text, participants, Func }) => {
    let users = participants.map(u => u.id)
    await conn.reply(m.chat, text, null, { mentions: users })
  },
  help: ['hidetag'],
  use: 'text',
  tags: ['owner'],
  command: /^(hidetag)$/i,
  owner: true,
  group: true
}