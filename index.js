// Import necessary modules
require('./config');
const { 
  default: lazack28Connect, useMultiFileAuthState, makeWASocket, Dislazack28ectReason, fetchLatestBaileysVersion, 
  generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, 
  generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, 
  DisconnectReason, getAggregateVotesInPollMessage 
} = require("@whiskeysockets/baileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const FileType = require('file-type');
const path = require('path');
const figlet = require('figlet');
const PhoneNumber = require('awesome-phonenumber');
const { spawn } = require('child_process');
const colors = require('@colors/colors/safe');
const CFonts = require('cfonts');
const moment = require('moment-timezone');

// Import custom functions and libraries
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunction');
const { color } = require('./lib/color');

// Create an in-memory store
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

// Get the current time and determine a greeting based on the time
const now = moment().tz("Asia/Jakarta");
const time = now.format("HH:mm:ss");
let ucapanWaktu;

if (time < "06:00:00") {
  ucapanWaktu = "Good Morning🌆";
} else if (time < "11:00:00") {
  ucapanWaktu = "Good Morning🏙️";
} else if (time < "15:00:00") {
  ucapanWaktu = "Good Afternoon🏞️";
} else if (time < "19:00:00") {
  ucapanWaktu = "Good Afternoon🌄";
} else {
  ucapanWaktu = "Good Night🌃";
}

// Get time in different time zones
const wib = now.clone().tz("Asia/Jakarta").locale("id").format("HH:mm:ss z");
const wita = now.clone().tz("Asia/Makassar").locale("id").format("HH:mm:ss z");
const wit = now.clone().tz("Asia/Jayapura").locale("id").format("HH:mm:ss z");
const salam = now.clone().tz("Asia/Jakarta").locale("id").format("a");

// Define some constants
const moji = ['📚', '💭', '💫', '🌌', '🌏', '〽️', '🌷', '🍁', '🪻'];
const randomemoji = moji[Math.floor(Math.random() * moji.length)];
const listcolor = ['aqua', 'red', 'blue', 'purple', 'magenta'];
const randomcolor = listcolor[Math.floor(Math.random() * listcolor.length)];
const randomcolor2 = listcolor[Math.floor(Math.random() * listcolor.length)];
const randomcolor3 = listcolor[Math.floor(Math.random() * listcolor.length)];
const randomcolor4 = listcolor[Math.floor(Math.random() * listcolor.length)];
const randomcolor5 = listcolor[Math.floor(Math.random() * listcolor.length)];


// Create Display Console 
const welcomeMessage = `
👋 Hii, I Am ${global.namabot}
${ucapanWaktu}
Session        : ${global.sessionName}
Waktu        : ${ucapanWaktu}
Base By    : Fauzialifatah

-> Base Ori By thisisfauzialifatah / fauzi
Dengan menggunakan script ini, Anda menyatakan bahwa Anda memahami dan setuju bahwa penggunaan script ini sepenuhnya berada pada risiko Anda sendiri!!
`;
// DISINI CONNECT NYA,  PAIRING 
const readline = require("readline")

const usePairingCode = true

const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};
async function lazack28Start() {
const { state, saveCreds } = await useMultiFileAuthState('./Session')
const lazack28 = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]
});
    // question code
    if(usePairingCode && !lazack28.authState.creds.registered) {
		const phoneNumber = await question('Masukan Nomer Yang Aktif Awali Dengan 62:\n');
		const code = await lazack28.requestPairingCode(phoneNumber.trim())
		console.log(`Pairing code: ${code}`)

	}
    //=============//
    lazack28.public = true

lazack28.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {};
        return decode.user && decode.server && decode.user + '@' + decode.server || jid;
    } else return jid;
};

lazack28.ev.on('contacts.update', update => {
    for (let contact of update) {
        let id = lazack28.decodeJid(contact.id);
        if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
    }
});

lazack28.setStatus = (status) => {
    lazack28.query({
        tag: 'iq',
        attrs: {
            to: '@s.whatsapp.net',
            type: 'set',
            xmlns: 'status',
        },
        content: [{
            tag: 'status',
            attrs: {},
            content: Buffer.from(status, 'utf-8')
        }]
    });
    return status;
};

lazack28.sendText = (jid, text, quoted = '', options) => lazack28.sendMessage(jid, { text: text, ...options }, { quoted });

lazack28.public = true;

    lazack28.getName = (jid, withoutContact  = false) => {
        id = lazack28.decodeJid(jid)
        withoutContact = lazack28.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = lazack28.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === lazack28.decodeJid(lazack28.user.id) ?
            lazack28.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    lazack28.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await lazack28.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await lazack28.getName(i + '@s.whatsapp.net')}\nFN:${await lazack28.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:${email}\nitem2.X-ABLabel:Email\nitem3.URL:${myweb}\nitem3.X-ABLabel:${namaweb}\nitem4.ADR:;;${region};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	lazack28.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
    }
    
    lazack28.serializeM = (m) => smsg(lazack28, m, store);

    
   lazack28.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        try {
            if (connection === 'close') {
                let reason = new Boom(lastDisconnect?.error)?.output.statusCode
                if (reason === DisconnectReason.badSession) {
                    console.log(`Bad Session File, Please Delete Session and Scan Again`);
                    lazack28()
                } else if (reason === DisconnectReason.connectionClosed) {
                    console.log("Connection closed, reconnecting....");
                    lazack28Start();
                } else if (reason === DisconnectReason.connectionLost) {
                    console.log("Connection Lost from Server, reconnecting...");
                    lazack28Start();
                } else if (reason === DisconnectReason.connectionReplaced) {
                    console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                    lazack28()
                } else if (reason === DisconnectReason.loggedOut) {
                    console.log(`Device Logged Out, Please Scan Again And Run.`);
                    lazack28Start();
                } else if (reason === DisconnectReason.restartRequired) {
                    console.log("Restart Required, Restarting...");
                    lazack28Start();
                } else if (reason === DisconnectReason.timedOut) {
                    console.log("Connection TimedOut, Reconnecting...");
                    lazack28Start();
                } else lazack28.end(`Unknown DisconnectReason: ${reason}|${connection}`)
            }
            if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
                console.log(color(`Mengkoneksikan`,`${randomcolor3}`)) //Console-1
            }
            
            if (update.connection == "open" || update.receivedPendingNotifications == "true") {
                console.log(color(figlet.textSync(`BASE SCRIPT`, //Console-2
              {
                font: 'Standard',
                horizontalLayout: 'default',
                vertivalLayout: 'default',
                width: 80,
                whitespaceBreak: false
                }), `${randomcolor4}`))
                
        console.log(color(`                                       :\`  .
                                   -s- -o.
                                   -do./d+\`
                       .\`-+:-\`:+:\` -hd+/dh:
                   .+++++mmmdhNmdy++dmhshds-
                ..-oNNNNNNNNNNNNNNmmmmmdmdds-
              +hdmmNNNNNmmmmmNNNmmmmmmdddds:\`
            -+mNNNNNdy+::-----:+shmmmmmddddddy:
           .sdNNNNNd+-           \`-ohmmmddddhddo\`
          \`:dNNNNh-..               .+hddddddhmms.                    
         \`:dmmNNN:..                  .sddddddmmmy-
         .osmNmNm-..                    :sdddddmmmo'
         \`:NNNNNs..                      ./ydddmmh-\`
           sdmNNNNs-                         -odmmmms-
          \`-.:mNNNNd+.                         .ommmmmh-
             \`ydhmNNNds:.                       +mmmmh.
               .\`-+ydmNNmds+-\`                -:.\`
                   \`\`-/oydmNNmyo-
                          \`.:oymmmh+.
                              \`-ohmmo.
                                   .odd:
                                     \`od:
                                       /d\`
                                        y.
                                       .\`
`,`${randomcolor5}`));
                
                console.log(color(`${welcomeMessage}`,`${randomcolor}`)) //Console-3
                console.log(color(`✅ Sukses Connected Bot WhatsApp`,`${randomcolor}`))
                console.log(color(`📝 Terima kasih atas pengertian dan kerjasama Anda.`))
                await sleep(1000)
                
            lazack28.sendMessage('6281340019858@s.whatsapp.net', {
                image: {
                    url: 'ttps://files.catbox.moe/k68d72.jpg'
                }, 
                caption: 'Menyalaa Abangkuuu🔥🔥'
            })
            
            await sleep(5000)
            
            lazack28.sendMessage('6281340019858@s.whatsapp.net', {
                text: `_*PERINGATAN/RULES‼️*_

> _Script ini disediakan secara gratis dan tanpa biaya. Dilarang keras untuk menjual atau mendistribusikan ulang untuk keuntungan komersial, atau menggunakan script ini untuk tujuan komersial tanpa izin tertulis. Kami ingin tegaskan bahwa script ini diberikan secara gratis untuk berbagi pengetahuan dan membantu komunitas. Setiap upaya menjual atau mengkomersilkan script ini tanpa izin merupakan pelanggaran etika yang tidak diterima. Gunakanlah script ini dengan penuh tanggung jawab dan hormati usaha yang telah dilakukan oleh pembuatnya._
> My YouTube: @Fauzialifatah
> My Instagram: @fauzialifatah_

_*Selamat Mencoba Base Dari Kami✅*_`
              })
            }

        } catch (err) {
            console.log('Error Di Connection.update ' + err);
                lazack28Start()
        }

    })
        
    lazack28.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                lazack28.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })
    
      /**
      *
      * @param {*} jid
      * @param {*} url
      * @param {*} caption
      * @param {*} quoted
      * @param {*} options
      */
     lazack28.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return lazack28.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return lazack28.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return lazack28.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return lazack28.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return lazack28.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }

   /**
     * 
     * @param {*} jid 
     * @param {*} name 
     * @param [*] values 
     * @returns 
     */
    lazack28.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return lazack28.sendMessage(jid, { poll: { name, values, selectableCount }}) }
    
    
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    lazack28.sendText = (jid, text, quoted = '', options) => lazack28.sendMessage(jid, { text: text, ...options }, { quoted, ...options })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    lazack28.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await lazack28.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} caption 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    lazack28.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await lazack28.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} mime 
     * @param {*} options 
     * @returns 
     */
    lazack28.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await lazack28.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    lazack28.sendTextWithMentions = async (jid, text, quoted, options = {}) => lazack28.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    lazack28.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await lazack28.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    lazack28.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await lazack28.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
	
    /**
     * 
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    lazack28.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
	let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    lazack28.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     } 
    
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} filename
     * @param {*} caption
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    lazack28.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await lazack28.getFile(path, true)
           let { mime, ext, res, data, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
       else if (/image/.test(mime)) type = 'image'
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await lazack28.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
       }

    /**
     * 
     * @param {*} jid 
     * @param {*} message 
     * @param {*} forceForward 
     * @param {*} options 
     * @returns 
     */
    lazack28.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await lazack28.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }

    lazack28.cMod = (jid, copy, text = '', sender = lazack28.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === lazack28.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }


    /**
     * 
     * @param {*} path 
     * @returns 
     */
    lazack28.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }

lazack28.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!lazack28.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            if (mek.key.id.startsWith('Lazack_')) return
            m = smsg(lazack28, mek, store)
            require("./case")(lazack28, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })


lazack28.ev.process(
    async (events) => {
        if (events['presence.update']) {
            await lazack28.sendPresenceUpdate('available');
        }
        if (events['messages.upsert']) {
            const upsert = events['messages.upsert'];
            for (let msg of upsert.messages) {
                if (msg.key.remoteJid === 'status@broadcast') {
                    if (msg.message?.protocolMessage) return;
                    await sleep(3000);
                    await lazack28.readMessages([msg.key]);
                }
            }
        }
        if (events['creds.update']) {
            await saveCreds();
        }
    }
)

return lazack28
}

lazack28Start()

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`));
    delete require.cache[file];
    require(file);
});
