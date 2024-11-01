module.exports = {
  run: async (m, { conn, usedPrefix }) => {
    conn.reply(m.chat, `🏷️ Upgrade to premium plan only Tsh 1500,- to get unlimited limits for 700 amount chat, you will be able to command the bot at my inbox.\n\nIf you want to buy contact *${usedPrefix}owner*`, m)
  },
  help: ['premium'],
  tags: ['miscs'],
  command: /^(premium)$/i
}