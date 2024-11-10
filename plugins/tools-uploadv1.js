const axios = require("axios");
const FormData = require("form-data");
const { fileTypeFromBuffer } = require("file-type");

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let quotedMessage = m.quoted ? m.quoted : m;
  let mimeType = (quotedMessage.msg || quotedMessage).mimetype || '';
  
  if (!mimeType) return m.reply('No media found');
  
  let media = await quotedMessage.download();
  let result = await uploadToPomf2(media);
  
  try {
    m.reply(`*[ Pomf2 Uploader ]*

*Name:* ${result.files[0].name}
*Link:* ${result.files[0].url}
*Size:* ${result.files[0].size}
*Expired:* Not expired date`);
  } catch (e) {
    return m.reply(e);
  }
}

handler.help = ['up'];
handler.tags = ['tools'];
handler.command = /^(up)$/i;
handler.limit = true;

module.exports = handler;

async function uploadToPomf2(media) {
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
      resolve(error?.response);
    });
  });
}