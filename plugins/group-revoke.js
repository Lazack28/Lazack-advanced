let handler = async (m, { isAdmin, isOwner, conn, command, Func }) => {
  conn.groupRevokeInvite(m.chat)
  conn.reply(m.chat, `Successful ${command} group link, link has been sent to private chat`, m,)
  await Func.delay(1000)
  let linknya = await conn.groupInviteCode(m.chat)
  conn.reply(m.sender, 'https://chat.whatsapp.com/' + linknya, m)
}
handler.help = handler.command = ['revoke']
handler.tags = ['group']
handler.group = handler.admin = handler.botAdmin = true

module.exports = handler