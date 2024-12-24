import axios from 'axios'
import { fileTypeFromBuffer } from 'file-type'

/**
 * Upload image to telegra.ph / imgbb / neko.pe / catbox.moe
 * Supported all mimetype
 * @param {Buffer} buffer Media Buffer
 * @return {Promise<string>}
**/
export default async (buffer, json = false) => {
  const { ext, mime } = await fileTypeFromBuffer(buffer)
  let form = new FormData()
  let host, link, filesize, status = true
  const r = (Math.random() + 1).toString(36).substring(2)
  const blob = new Blob([buffer], { type: mime })
  const filename = r + '.' + ext
  form.append(mime.split('/')[0], blob, filename)
  try {
    const anu = await axios.post('https://api.imgbb.com/1/upload', form, {
      params: {
        'expiration': '172800',
        'key': '3a2cb6230bf31e8e2d3fc6eaa52d5e84'
      }
    })
    host = 'https://imgbb.com'
    link = anu.data.data.url
    filesize = anu.data.data.size
  } catch {
    try {
      form = new FormData()
      form.append('file', blob, filename)
     const response = await fetch('https://storage.neko.pe/api/upload.php', {
        method: 'post',
        body: form,
      })
      const data = await response.json()
      host = 'https://neko.pe'
      link = data.result.url_file
      filesize = data.result.filesize
    } catch {
      try {
        form = new FormData()
        form.append("fileToUpload", buffer, filename)
        form.append("reqtype", "fileupload")
        const response = await fetch('https://catbox.moe/user/api.php', {
          method: 'POST',
            body: form,
        })
        const data = await response.text()
        host = 'https://catbox.moe'
        link = data
        filesize = niceBytes(Buffer.byteLength(buffer))
      } catch (e) {
        console.log(e)
        status = false
      }
    }
  }
  if (!status) return false
  if (json) return {
    status: true,
    result: {
      host: host,
      filename: filename,
      mimetype: mime,
      filesize: filesize,
      url: link
    }
  }
  else return link
}

async function niceBytes(x) {
  let units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(x, 10) || 0;
  while(n >= 1024 && ++l){
    n = n/1024;
  }
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}