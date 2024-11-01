const { Function: Func } = new (require('@im-dims/wb'))
const fs = require('fs')
const mime = require('mime-types').lookup
const Jimp = require('jimp')
const { default: makeWASocket, makeWALegacySocket, extractMessageContent, makeInMemoryStore, proto, prepareWAMessageMedia, downloadContentFromMessage, getBinaryNodeChild, jidDecode, areJidsSameUser, generateWAMessage, generateForwardMessageContent, generateWAMessageFromContent, getContentType, WAMessageStubType, getDevice, WA_DEFAULT_EPHEMERAL } = require('@whiskeysockets/baileys')

module.exports = conn => {
   conn.sendFDoc = async (jid, text, quoted, opts = {}) => {
      await conn.sendPresenceUpdate('composing', jid)
      return conn.sendMessage(jid, {
         document: {
            url: 'https://iili.io/His5lBp.jpg'
         },
         url: 'https://mmg.whatsapp.net/v/t62.7119-24/31158881_1025772512163769_7208897168054919032_n.enc?ccb=11-4&oh=01_AdSBWokZF7M6H3NCfmTx08kHU3Dqw8rhlYlgUfXP6sACIg&oe=64CC069E&mms3=true',
         mimetype: (opts && opts.mime) ? mime(opts.mime) : mime('ppt'),
         fileSha256: 'dxsumNsT8faD6vN91lNkqSl60yZ5MBlH9L6mjD5iUkQ=',
         pageCount: (opts && opts.pages) ? Number(opts.pages) : 25,
         fileEncSha256: 'QGPsr3DQgnOdGpfcxDLFkzV2kXAaQmgTV8mYDzwrev4=',
         jpegThumbnail: (opts && opts.thumbnail) ? await Func.createThumb(opts.thumbnail) : await Func.createThumb('https://iili.io/HisdzgI.jpg'),
         fileName: (opts && opts.fname) ? opts.fname : global.header,
         fileLength: (opts && opts.fsize) ? Number(opts.fsize) : 1000000000000,
         caption: text,
         mediaKey: 'u4PCBMBCnVT0s1M8yl8/AZYmeK8oOBAh/fnnVPujcgw=',
      }, { quoted })
   }
   
  conn.sendFMusic = async (jid, url, name, newles, quoted, options = {}) => {
    await conn.sendPresenceUpdate('composing', jid)	
    return conn.sendMessage(jid, { audio: { url: url }, mimetype: "audio/mpeg", ptt: true, 
      contextInfo: {
        forwardingScore: 100,
        isForwarded: true, 
        mentionedJid: null,
        businessMessageForwardInfo: { 
          businessOwnerJid: "6281398274790@s.whatsapp.net" 
        }, 
        forwardedNewsletterMessageInfo: {
          newsletterName: name,
          newsletterJid: newles
        }
      }
    }, { quoted, ...options })
  }
  
  conn.sendButton = async (jid, text = '', footer = '', buffer, buttons, quoted, copy, urls, options = {}) => {
  conn.sendPresenceUpdate('composing', jid)	
    let file, isAndroid = await getDevice(quoted?.id) === 'android' ? true : false
    if (buffer) {
      try {
        file = await conn.getFile(buffer) // if not android, send normal message instead of button
        if (!isAndroid) return await conn.sendFile(jid, buffer, '', text, quoted, false, options).catch(() => { conn.reply(jid, text, quoted, false, options) })
        else buffer = await prepareWAMessageMedia({ [/image/.test(file.mime) ? 'image' : 'video'] : file.data }, { upload: conn.waUploadToServer })
      } catch (e) {
        console.error(e)
        file = buffer = null
      }
    } else { 
      if (!isAndroid) return await conn.reply(jid, text, quoted) 
    }
    
    if (!Array.isArray(buttons[0]) && typeof buttons[0] === 'string') buttons = [buttons]
    if (!options) options = {}
    
    const newbtns = buttons.map(btn => ({
      name: 'quick_reply',
      buttonParamsJson: JSON.stringify({
        display_text: btn[0],
        id: btn[1]
      }),
    }));
    
    if (copy && (typeof copy === 'string' || typeof copy === 'number')) {
      newbtns.push({
        name: 'cta_copy',
        buttonParamsJson: JSON.stringify({
          display_text: 'Copy',
          copy_code: copy
        })
      });
    }
    
    if (urls && Array.isArray(urls)) {
      urls.forEach(url => {
        newbtns.push({
          name: 'cta_url',
          buttonParamsJson: JSON.stringify({
            display_text: url[0],
            url: url[1],
            merchant_url: url[1]
          })
        })
      })
    }

    const mime = /image/.test(file?.mime || '') ? 'imageMessage' : 'videoMessage'
    const interactiveMessage = {
      body: { text: text },
      footer: { text: footer },
      header: {
        hasMediaAttachment: false,
        [mime]: buffer ? buffer[mime] : null
      },
      nativeFlowMessage: {
        buttons: newbtns,
        messageParamsJson: ''
      }
    }

    let msgL = generateWAMessageFromContent(jid, { viewOnceMessage: { message: { interactiveMessage }}}, { userJid: conn.user.jid, quoted })
    return await conn.relayMessage(jid, msgL.message, { messageId: msgL.key.id, ...options })
  }
   
  conn.resize = async (image, width, height) => {
    let oyy = await Jimp.read(image)
    let kiyomasa = await oyy.resize(width, height).getBufferAsync(Jimp.MIME_JPEG)
    return kiyomasa
  }
  
  // If you want to add another function, put it here . . .
}