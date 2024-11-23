Module.export = {

async before(m, { conn}){
    // when someone sends a group link to the bot's dm
    if (
      (m.mtype === 'groupInviteMessage' ||
        m.chat.startsWith('Hello') ||
        m.chat.startsWith('Mambo')) &&
      !m.isBaileys &&
      !m.isGroup
    ) {
     return conn.reply(m.chat, `*Hi ✋*`, m)
      }
      return !0
   }
}