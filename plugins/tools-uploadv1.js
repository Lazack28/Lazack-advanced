const axios = require("axios")
const FormData = require("form-data")
const { fileTypeFromBuffer } = require("file-type")

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return m.reply('Tidak ada media yang ditemukan')
  let media = await q.download()
  let result = await uploadPomf2(media)
  try {
    m.reply(`*[ Uploader Pomf2 ]*

*Name:* ${result.files[0].name}
*Link:* ${result.files[0].url}
*Size:* ${result.files[0].size}
*Expired:* Not expired date`)
  } catch (e) {
    return m.reply(e)
  }
}
handler.help = ['up']
handler.tags = ['tools']
handler.command = /^(up)$/i
handler.limit = true

module.exports = handler

async function uploadPomf2(media) {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append('files[]', media, { 
      filename: new Date() * 1 + '.jpg' 
    });
    await axios.post('https://pomf2.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    })
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      resolve(e?.response)
    });
  })
}