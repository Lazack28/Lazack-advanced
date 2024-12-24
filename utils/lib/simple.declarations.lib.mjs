import configs from '../../Setting/settings.mjs'
import Jimp from 'jimp'
import fs from 'node:fs'
import path from 'path'
import { fileTypeFromBuffer } from 'file-type'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const { proto,
  jidDecode,
  areJidsSameUser,
  downloadContentFromMessage,
  extractMessageContent,
  generateForwardMessageContent,
  generateWAMessage,
  generateWAMessageFromContent,
  getContentType,
  getDevice,
  prepareWAMessageMedia,
  toReadable,
  WAMessageStubType  
} = (await import('baileys')).default

const simpleDeclarations = async (chat) => {
  try {
    /**
     * Regex mention match
     * @param {String} query
     * @returns
    **/
    chat.ments = async (query) => {
      return new Promise((r, j) => r(query.match("@") ? [...query.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + configs.idwa) : []))
    }
  
    /**
     * getBuffer hehe
     * @param {fs.PathLike} path
     * @param {Boolean} returnFilename
    **/
    chat.getFile = async (PATH, returnAsFilename) => {
      let res, filename
      const data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
      if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      const type = await fileTypeFromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
      }
      if (data && returnAsFilename && !filename) (filename = path.join(__dirname, '../../.tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
      return {
        res,
        filename,
        ...type,
        data,
        deleteFile() {
          return filename && fs.promises.unlink(filename)
        }
      }
    }
    
    /**
     * Send Media/File with Automatic Type Specifier
     * @param {String} jid
     * @param {String|Buffer} path
     * @param {String} filename
     * @param {String} caption
     * @param {proto.WebMessageInfo} quoted
     * @param {Boolean} ptt
     * @param {Object} options
    **/
    chat.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
      let type = await chat.getFile(path, true)
      let { res, data: file, filename: pathFile } = type
      if (res && res.status !== 200 || file.length <= 65536) {
        try {
          throw {
            json: JSON.parse(file.toString())
          }
        } catch (e) {
          if (e.json) throw e.json
        }
      }
      let opt = { filename }
      if (quoted) opt.quoted = quoted
      if (!type) options.asDocument = true
      let mtype = '',
        mimetype = type.mime,
        convert
      if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
      else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
      else if (/video/.test(type.mime)) mtype = 'video'
      else if (/audio/.test(type.mime)) (convert = await (ptt ? toPTT : toAudio)(file, type.ext), file = convert.data, pathFile = convert.filename, mtype = 'audio', mimetype = 'audio/ogg; codecs=opus')
      else mtype = 'document'
      if (options.asDocument) mtype = 'document'

      delete options.asSticker
      delete options.asLocation
      delete options.asVideo
      delete options.asDocument
      delete options.asImage

      let message = {
        ...options,
        caption,
        ptt,
        [mtype]: {
          url: pathFile
        },
        mimetype
      }
      let m
      try {
        m = await chat.sendMessage(jid, message, {
          ...opt,
          ...options
        })
      } catch (e) {
        console.error(e)
        m = null
      } finally {
        if (!m) m = await chat.sendMessage(jid, {
          ...message,
          [mtype]: file
        }, {
          ...opt,
          ...options
        })
        return m
      }
    }
    
    /**
     * Send Media All Type 
     * @param {String} jid
     * @param {String|Buffer} path
     * @param {Object} quoted
     * @param {Object} options 
    **/
    chat.sendMedia = async (jid, path, quoted, options = {}) => {
      await chat.sendPresenceUpdate('composing', jid)
      let { ext, mime, data } = await chat.getFile(path)
      let messageType = mime.split("/")[0]
      let pase = messageType.replace('application', 'document') || messageType
      return await chat.sendMessage(jid, { [pase]: data, mimetype: mime, ...options }, { quoted })
    }
        
    /**
     * sendIAMessage by Lazack
     * @param {String} chatId 
     * @param {String[]} btns 
     * @param {String} opts
     * @param {Buffer|String} buffer 
     * @param {proto.WebMessageInfo} qoted 
     * @param {Object} options 
    **/
    chat.sendIAMessage = async (chatId, btns = [], qoted, opts = {}) => {
      let messageContent = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: opts.content || ''
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: opts.footer || ''
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                title: opts.header || '',
                subtitle: '',
                hasMediaAttachment: false,
              }),
              contextInfo: {
                forwardingScore: 9999,
                isForwarded: false,
                mentionedJid: chat.ments(opts.header || '' + opts.content || '' + opts.footer || '')
              },
              externalAdReply: { 
                showAdAttribution: true, 
                renderLargerThumbnail: false, 
                mediaType: 1
              },
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: btns
              })
            })
          }
        }
      }
      if (opts.media) {
        const media = await prepareWAMessageMedia({
          [opts.mediaType || 'image']: { url: opts.media } // type image/video { url: params }
        }, {
          upload: chat.waUploadToServer
        })
        messageContent.viewOnceMessage.message.interactiveMessage.header.hasMediaAttachment = true
        messageContent.viewOnceMessage.message.interactiveMessage.header = {
          ...messageContent.viewOnceMessage.message.interactiveMessage.header,
          ...media
        }
      }
      let msg = await generateWAMessageFromContent(chatId, messageContent, { quoted: qoted })
      await chat.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      })
    }
    
    /**
     * Create jid at id
     * @param {String} chatId
     * @returns chatId
    **/
    chat.createJid = (chatId) => {
      if (!chatId) return chatId
      if (/:\d+@/gi.test(chatId)) {
        let decode = jidDecode(chatId) || {}
        return (decode.user && decode.server && decode.user + "@" + decode.server) || chatId
      } else return chatId
    }
    
    /**
     * Send Kontak maybe
     * @param {String} chatId
     * @param {String} teks
     * @param {Array} arr
     * @param {String} quoted
     * @param {Object} opts
     * @returns
    **/
    chat.sendkon = async (chatId, teks, arr = [...[0, 1, 2]], quoted = "", opts = {}) => {
      var push = []
      for (let i of arr)
        push.push({displayName: "", vcard: "BEGIN:VCARD\n" + 
          "VERSION:3.0\n" + 
          "FN:" + 
          i[0] + 
          "\n" + 
          "ORG:" + 
          i[2] + 
          "<\n" + 
          "TEL;type=CELL;type=VOICE;waid=" + 
          i[1] + 
          ":" + 
          i[1] + 
          "\n" + 
          "END:VCARD"
        })
      return new Promise((r, j) => r(chat.sendMessage(chatId, { contacts: { displayName: teks, contacts: push }, ...opts }, { quoted })))
    }
    
    /**
     * Send Button teks
     * @param {String} chatId
     * @param {String} teks
     * @param {String} foot
     * @param {Array} but
     * @param {String} quoted
     * @param {Object} opts
     * @returns
    **/
    chat.sendlist = async (chatId, teks, foot, but = [...[(dis = ""), (id = ""), (des = "")]], quoted = "") => {
      let coi = []
      for (let u of but) coi.push({ title: u[0], rowId: u[1], description: u[2] })
      return new Promise((r, j) => r(chat.sendMessage(chatId, { 
        text: teks,
        footer: foot,
        title: null,
        buttonText: "Click Here",
        sections: [{ title: "Ballbot", rows: coi }]
      }, { quoted })))
    }
    
    /**
     * Send Button teks
     * @param chatId
     * @param {String} text
     * @param {String} footer
     * @param {Array} but
     * @param {String} men
     * @param {Object} opts
     * @returns
    **/
    chat.butteks = async (chatId, text, footer, but = [...[dis, id]], quoted = "", opts = {}) => {
      let button = []
      for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 })
      return new Promise((r, j) => r(chat.sendMessage(chatId, { text: text, footer, buttons: button, headerType: 2, ...opts }, { quoted })))
    }
    
    /**
     * Send Teks biasaa
     * @param {String} chatId
     * @param {String} text
     * @param {String} quoted
     * @param {Object} opts
     * @returns
    **/
    chat.sendteks = async (chatId, text, quoted = "", opts = {}) => {
      return new Promise((r, j) => r(chat.sendMessage(chatId, { text, ...opts }, { quoted })))
    }

    // SEND MEDIA FROM  URL
    /**
     * Send Button Video
     * @param {String} chatId
     * @param {String} vid
     * @param {String} text
     * @param {String} footer
     * @param {Array} but
     * @param {String} men
     * @param {Object} opts
     * @returns
    **/
    chat.butvid = async (chatId, vid, text, footer, but = [...[dis, id]], quoted = "", opts = {}) => {
      let button = []
      for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 })
      return new Promise(() => chat.sendMessage(chatId, { video: { url: vid }, caption: text, footer, buttons: button, headerType: 5, ...opts }, { quoted }))
    }
    
    /**
     * Send Button Image
     * @param {String} chatId
     * @param {String} img
     * @param {String} text
     * @param {String} footer
     * @param {Array} but
     * @param {String} men
     * @param {Object} opts
     * @returns
    **/
    chat.butimg = async (chatId, img, text, footer, but = [...[dis, id]], quoted = "", opts = {}) => {
      let button = []
      for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 })
      return new Promise(() => chat.sendMessage(chatId, { image: { url: img }, caption: text, footer, buttons: button, headerType: 4, ...opts }, { quoted }))
    }
    
    /**
     * Send Image
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} image
     * @returns
    **/
    chat.sendimg = async (chatId, img, teks = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { image: { url: img }, caption: teks }, { quoted }, opts))
    }
    
    /**
     * Send Video
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} vid
     * @returns
    **/
    chat.sendvid = async (chatId, vid, teks = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { video: { url: vid }, caption: teks }, { quoted }, opts))
    }
    
    /**
     * Send Audio
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} aud
     * @returns
    **/
    chat.sendaud = async (chatId, aud, quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { audio: { url: aud }, mimetype: "audio/mp4" }, { quoted }, opts))
    }
    
    /**
     * Send Document
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} doc
     * @returns
    **/
    chat.senddoc = async (chatId, doc, name = "", mime = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { document: { url: doc }, mimetype: mime, fileName: name }, { quoted }, opts))
    }

    /**
     * Send Video use buffer
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} path
     * @returns
    **/
    chat.sendvidbuf = async (chatId, path, teks = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { video: path, caption: teks }, { quoted }, opts))
    }
    
    /**
     * Send Image use buffer
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} path
     * @returns
    **/
    chat.sendimgbuf = async (chatId, buff, teks = "", quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { image: buff, caption: teks }, { quoted }, opts))
    }
    
    /**
     * Send Audio from local
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} aud
     * @returns
    **/
    chat.sendaudlok = async (chatId, path, teks = "", quoted = "", opts = {}) => {
      return new Promise(async () => chat.sendMessage(chatId, { audio: await fs.readFileSync(path) }, { quoted }, opts))
    }
    
    /**
     * Send Document from local
     * @param {String} chatId
     * @param {String} text
     * @param {Buffer} doc
     * @returns
    **/
    chat.senddoclok = async (chatId, path, name = "", mime = "", quoted = "", opts = {}) => {
      return new Promise(async () => chat.sendMessage(chatId, { document: await fs.readFileSync(path), mimetype: mime, fileName: name }, { quoted }, opts))
    }
    
    // hot restart // using pm2 for guide it
    chat.restart = async (m) => {
      if (/pm2/i.test(process.env._)) eval("process.exit()")
      else
        return new Promise(() => chat.sendteks(m.chat, "silahkan gunakan PM2 untuk menggunakan auto restart App", m))
    }
    
    /**
     * Send Stiker from local
     * @param {String} chatId
     * @param {Object} opts
     * @param {Buffer} path
     * @returns
    **/
    chat.sendstik = async (chatId, path, quoted = "", opts = {}) => {
      return new Promise(() => chat.sendMessage(chatId, { sticker: path, ...opts }, { quoted }))
    }
    
    /**
     * Regenerate resize from Jimp
     * @param {Buffer} buff
     * @returns
     * By Bochiel team
     */
    chat.resize = async (buff) => {
      const jimp = await Jimp.read(buff)
      const crop = jimp.crop(0, 0, await jimp.getWidth(), await jimp.getHeight())
      return {
        img: await crop.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await crop.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
      }
    }
    
    /**
     * create Profile
     * @param {String} chatId
     * @param {Buffer} img
     * @returns
     */
    chat.createprofile = async (chatId, buff) => {
      const { img } = await chat.resize(buff)
      return chat.query({
        tag: "iq",
        attrs: { to: chatId, type: "set", xmlns: "w:profile:picture" },
        content: [{ tag: "picture", attrs: { type: "image" }, content: img }]
      })
    }
    
    /**
     * Write file using fs
     * @param {String} path path located json file
     * @param {Object} db database in save file
     * @returns
    **/
    chat.writejson = (path, db) => fs.writeFileSync(path, JSON.stringify(db, null, 2))

    /**
     * Read file using fs and callback
     * @param {String} path path to located file JSON
     * @param {callback} cb callback form function
     * @returns
    **/
    chat.readjson = (path) => JSON.parse(fs.readFileSync(path, "utf-8"))
    return chat
  } catch (e) {
    console.log(e)
  }
}

export default simpleDeclarations