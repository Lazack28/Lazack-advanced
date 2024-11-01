let handler = async(m, { conn, command, usedPrefix, text }) => {
  let fail = 'Format salah!, Contoh: ' + usedPrefix + command + ' Judul catatan|Isi catatan'
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []
  
  let catatan = global.db.data.users[m.sender].catatan
  let split = text.split('|')
  let title = split[0]
  let isi = split[1]
  
  if (catatan.includes(title)) return m.reply('Judul tidak tersedia!\nAlasan: Sudah digunakan')
  if (!title || !isi) return m.reply(fail)
  let cttn = {
    'title': title,
    'isi': isi
  }
  global.db.data.users[m.sender].catatan.push(cttn)
  conn.sendTextWithMentions(m.chat, `Catatan @${m.sender.split('@')[0]} berhasil di buat, Untuk melihat catatan ketik ${usedPrefix}lihatcatatan`, m)
}
handler.help = ['buatcatatan'].map(v => v + ' *judul|isi*')
handler.tags = ['database']
handler.command = /^buatcatatan$/i

module.exports = handler