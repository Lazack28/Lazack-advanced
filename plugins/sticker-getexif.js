let { format } = require('util')
let { Image } = require('node-webpmux')

let handler = async (m) => {
  if (!m.quoted) return m.reply('Reply the sticker!')
  if (/sticker/.test(m.quoted.mtype)) {
    let gambar = new Image()
    await gambar.load(await m.quoted.download())
    m.reply(format(JSON.parse(gambar.exif.slice(22).toString())))
  }
}
handler.command = handler.help = ['getexif']
handler.tags = ['sticker']

module.exports = handler