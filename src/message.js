//base by DGXeon
//re-upload? recode? copy code? give credit ya :)
//YouTube: @DGXeon
//Instagram: unicorn_xeon13
//Telegram: t.me/xeonbotinc
//GitHub: @DGXeon
//WhatsApp: +916909137213
//want more free bot scripts? 
//subscribe to my youtube channel: https://youtube.com/@DGXeon


require('../settings');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const FileType = require('file-type');
const moment = require('moment-timezone');
const PhoneNumber = require('awesome-phonenumber');
const prem = require('./premium');
const { writeExif, imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('../lib/exif');
const premium = JSON.parse(fs.readFileSync('./database/premium.json'));
const { isUrl, getGroupAdmins, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep, getTypeUrlMedia } = require('../lib/function');
const { jidNormalizedUser, proto, getBinaryNodeChildren, generateWAMessageContent, generateForwardMessageContent, prepareWAMessageMedia, delay, areJidsSameUser, extractMessageContent, generateMessageID, downloadContentFromMessage, generateWAMessageFromContent, jidDecode, generateWAMessage, toBuffer, getContentType, getDevice } = require('@whiskeysockets/baileys');

async function GroupUpdate(XeonBotInc, update) {
	try {
		for (let n of update) {
			let setinfo = global.db.groups[n.id].setinfo
			if (setinfo) {
				let profile;
				try {
					profile = await XeonBotInc.profilePictureUrl(n.id, 'image');
				} catch {
					profile = 'https://telegra.ph/file/95670d63378f7f4210f03.png';
				}
				if (n.announce) {
					await XeonBotInc.sendMessage(n.id, {
						text: 'Group has been closed by Admin',
						contextInfo: {
							externalAdReply: {
								title: 'Group Closed',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
				} else if (n.announce == false) {
					await XeonBotInc.sendMessage(n.id, {
						text: 'The group has been opened by the Admin',
						contextInfo: {
							externalAdReply: {
								title: 'Group Open',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
				} else if (n.restrict) {
					await XeonBotInc.sendMessage(n.id, {
						text: 'Now only Admin can edit Group info',
						contextInfo: {
							externalAdReply: {
								title: 'Group Update Info',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
				} else if (n.restrict == false) {
					await XeonBotInc.sendMessage(n.id, {
						text: 'Now Participants can edit Group info',
						contextInfo: {
							externalAdReply: {
								title: 'Group Update Info',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
				} else {
					await XeonBotInc.sendMessage(n.id, {
						text: 'Group Subject is changed to ' + n.subject,
						contextInfo: {
							externalAdReply: {
								title: 'Group Update Subject',
								mediaType: 1,
								previewType: 0,
								thumbnailUrl: profile,
								renderLargerThumbnail: true,
								sourceUrl: global.my.gh
							}
						}
					});
				}
			}
		}
	} catch (e) {
		return;
	}
}

async function GroupParticipantsUpdate(XeonBotInc, { id, participants, action }) {
	try {
		let welcome = global.db.groups[id].welcome
		if (welcome) {
			let metadata = await XeonBotInc.groupMetadata(id);
			for (let n of participants) {
				let profile;
				try {
					profile = await XeonBotInc.profilePictureUrl(n, 'image');
				} catch {
					profile = 'https://telegra.ph/file/95670d63378f7f4210f03.png';
				}
				XeonWlcm = await getBuffer(profile)
                XeonLft = await getBuffer(profile)
				if (action == 'add') {
				let xeonName = n
                const xdate = moment.tz('Asia/Kolkata').locale('en-IN').format('DD/MM/YYYY');
                const xtime = moment().tz('Asia/Kolkata').locale('en-IN').format('HH:mm:ss');
	            const xmembers = metadata.participants.length
                xeonbody = `┌─❖
│「 𝗛𝗶 👋 」
└┬❖ 「  @${xeonName.split("@")[0]}  」
   │✑  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 
   │✑  ${metadata.subject}
   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : 
   │✑ ${xmembers}th
   │✑  𝗝𝗼𝗶𝗻𝗲𝗱 : 
   │✑ ${xtime} ${xdate}
   └───────────────┈ ⳹`
let msgs = generateWAMessageFromContent(id, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: xeonbody
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: botname
          }),
          header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false,
          ...await prepareWAMessageMedia({ image: XeonWlcm }, { upload: XeonBotInc.waUploadToServer })
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [{
            "name": "quick_reply",
              "buttonParamsJson": `{\"display_text\":\"Welcome 💐\",\"id\":\"\"}`
            }],
          }),
          contextInfo: {
                  mentionedJid: [n], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: global.xchannel.jid,
                  newsletterName: ownername,
                  serverMessageId: 143
                }
                }
       })
    }
  }
}, {})
await XeonBotInc.relayMessage(id, msgs.message, {})
				} else if (action == 'remove') {
				let xeonName = n
                const xeondate = moment.tz('Asia/Kolkata').locale('en-IN').format('DD/MM/YYYY');
                const xeontime = moment().tz('Asia/Kolkata').locale('en-IN').format('HH:mm:ss');
	            const xeonmembers = metadata.participants.length
					xeonbody = `┌─❖
│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋 」
└┬❖ 「 @${xeonName.split("@")[0]}  」
   │✑  𝗟𝗲𝗳𝘁 
   │✑ ${metadata.subject}
   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : 
   │✑ ${xeonmembers}th
   │✑  𝗧𝗶𝗺𝗲 : 
   │✑  ${xeontime} ${xeondate}
   └───────────────┈ ⳹`
let msgs = generateWAMessageFromContent(id, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: xeonbody
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: botname
          }),
          header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false,
          ...await prepareWAMessageMedia({ image: XeonLft }, { upload: XeonBotInc.waUploadToServer })
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [{
            "name": "quick_reply",
              "buttonParamsJson": `{\"display_text\":\"Goodbye 👋\",\"id\":\"\"}`
            }],
          }),
          contextInfo: {
                  mentionedJid: [n], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: global.xchannel.jid,
                  newsletterName: ownername,
                  serverMessageId: 143
                }
                }
       })
    }
  }
}, {})
await XeonBotInc.relayMessage(id, msgs.message, {})
				} else if (action == 'promote') {
const xeontime = moment().tz('Asia/Kolkata').locale('en-IN').format('HH:mm:ss');
const xeondate = moment.tz('Asia/Kolkata').locale('en-IN').format('DD/MM/YYYY');
let xeonName = n
xeonbody = ` 𝗖𝗼𝗻𝗴𝗿𝗮𝘁🎉 @${xeonName.split("@")[0]}, you have been *promoted* to *admin* 🥳`
   await XeonBotInc.sendMessage(id,
 { text: xeonbody,
 contextInfo:{
 mentionedJid:[n],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": XeonWlcm,
"sourceUrl": `${wagc}`}}})
				} else if (action == 'demote') {
const xeontime = moment().tz('Asia/Kolkata').locale('en-IN').format('HH:mm:ss');
const xeondate = moment.tz('Asia/Kolkata').locale('en-IN').format('DD/MM/YYYY');
let xeonName = n
xeonbody = `𝗢𝗼𝗽𝘀‼️ @${xeonName.split("@")[0]}, you have been *demoted* from *admin* 😬`
await XeonBotInc.sendMessage(id,
 { text: xeonbody,
 contextInfo:{
 mentionedJid:[n],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": XeonLft,
"sourceUrl": `${wagc}`}}})
				}
			}
		}
	} catch (e) {
		return;
	}
}
async function MessagesUpsert(XeonBotInc, message, store) {
	try {
		let botNumber = await XeonBotInc.decodeJid(XeonBotInc.user.id);
		const msg = message.messages[0];
		const type = msg.message ? (getContentType(msg.message) || Object.keys(msg.message)[0]) : '';
		if (!XeonBotInc.public && !msg.key.fromMe && message.type === 'notify') return
		if (msg.key.id.startsWith('BAE5')) return
		if (msg.key.id.length === 22) return
		if (!msg.message) return
		const m = await Serialize(XeonBotInc, msg, store)
		require('../XeonCheems15')(XeonBotInc, m, message, store);
		if (type === 'interactiveResponseMessage' && m.quoted && m.quoted.fromMe) {
			let apb = await generateWAMessage(m.chat, { text: JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, mentions: m.mentionedJid }, {
				userJid: XeonBotInc.user.id,
				quoted: m.quoted
			});
			apb.key = msg.key
			apb.key.fromMe = areJidsSameUser(m.sender, XeonBotInc.user.id);
			if (m.isGroup) apb.participant = m.sender;
			let pbr = {
				...msg,
				messages: [proto.WebMessageInfo.fromObject(apb)],
				type: 'append'
			}
			XeonBotInc.ev.emit('messages.upsert', pbr);
		}
		let antiswview = global.db.settings[botNumber].antiswview
		if (antiswview) {
			if (msg.key.remoteJid === 'status@broadcast') {
				await XeonBotInc.readMessages([msg.key]);
				if (/protocolMessage/i.test(type)) XeonBotInc.sendFromOwner(ownernumber, 'Status from @' + msg.key.participant.split('@')[0] + ' Was removed', msg, { mentions: [msg.key.participant] });
				if (/(audioMessage|imageMessage|videoMessage|extendedTextMessage)/i.test(type)) {
					let keke = (type == 'extendedTextMessage') ? `Story Caption : ${msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : ''}` : (type == 'imageMessage') ? `Image Story ${msg.message.imageMessage.caption ? 'with caption : ' + msg.message.imageMessage.caption : ''}` : (type == 'videoMessage') ? `Video Story ${msg.message.videoMessage.caption ? 'with caption : ' + msg.message.videoMessage.caption : ''}` : (type == 'audioMessage') ? 'Audio Story' : `\nIt's not known, just check directly`
					await XeonBotInc.sendFromOwner(ownernumber, `Story from @${msg.key.participant.split('@')[0]}\n${keke}`, msg, { mentions: [msg.key.participant] });
				}
			}
		}
	} catch (e) {
		return;
	}
}

async function Solving(XeonBotInc, store) {
	XeonBotInc.public = true
	
	XeonBotInc.serializeM = (m) => MessagesUpsert(XeonBotInc, m, store)
	
	XeonBotInc.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}
	
	XeonBotInc.getName = (jid, withoutContact  = false) => {
		const id = XeonBotInc.decodeJid(jid);
		if (id.endsWith('@g.us')) {
			const groupInfo = store.contacts[id] || XeonBotInc.groupMetadata(id) || {};
			return Promise.resolve(groupInfo.name || groupInfo.subject || PhoneNumber('+' + id.replace('@g.us', '')).getNumber('international'));
		} else {
			if (id === '0@s.whatsapp.net') {
				return 'WhatsApp';
			}
		const contactInfo = store.contacts[id] || {};
		return withoutContact ? '' : contactInfo.name || contactInfo.subject || contactInfo.verifiedName || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international');
		}
	}
	
	XeonBotInc.copyNForward = async (jid, message, forceForward = false, options = {}) => {
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
await XeonBotInc.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}
	
	XeonBotInc.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await XeonBotInc.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await XeonBotInc.getName(i)}\nFN:${await XeonBotInc.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
	    })
	}
	XeonBotInc.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }
	
	XeonBotInc.setStatus = (status) => {
		XeonBotInc.query({
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
		})
		return status
	}
	
	XeonBotInc.sendPoll = (jid, name = '', values = [], selectableCount = 1) => {
		return XeonBotInc.sendMessage(jid, { poll: { name, values, selectableCount }})
	}
	
	XeonBotInc.sendText = (jid, text, quoted = '', options) => XeonBotInc.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
	
	XeonBotInc.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await XeonBotInc.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }
    
    XeonBotInc.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await XeonBotInc.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
    }

XeonBotInc.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await XeonBotInc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
XeonBotInc.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await XeonBotInc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}
XeonBotInc.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await XeonBotInc.sendMessage(jid, {
            image: buffer,
            caption: caption,
            ...options
        }, {
            quoted
        })
    }
	
	XeonBotInc.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		const buffer = await axios.get(url, { responseType: 'arraybuffer' });
		const mime = buffer.headers['content-type'] || (await FileType.fromBuffer(buffer.data)).mime
		if (mime.includes('gif')) {
			return XeonBotInc.sendMessage(jid, { video: buffer.data, caption: caption, gifPlayback: true, ...options }, { quoted });
		} else if (mime === 'application/pdf') {
			return XeonBotInc.sendMessage(jid, { document: buffer.data, mimetype: 'application/pdf', caption: caption, ...options }, { quoted });
		} else if (mime.includes('image')) {
			return XeonBotInc.sendMessage(jid, { image: buffer.data, caption: caption, ...options }, { quoted });
		} else if (mime.includes('video')) {
			return XeonBotInc.sendMessage(jid, { video: buffer.data, caption: caption, mimetype: 'video/mp4', ...options }, { quoted });
		} else if (mime.includes('audio')) {
			return XeonBotInc.sendMessage(jid, { audio: buffer.data, mimetype: 'audio/mpeg', ...options }, { quoted });
		}
	}
	
	XeonBotInc.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await XeonBotInc.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await XeonBotInc.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await XeonBotInc.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
}

	
	XeonBotInc.sendFakeLink = async (jid, text, title, body, thumbnail, myweb, options = {}) => {
		await XeonBotInc.sendMessage(jid, {
			text: text,
			contextInfo: {
				externalAdReply: {
					title: title,
					body: body,
					previewType: 'PHOTO',
					thumbnailUrl: myweb,
					thumbnail: thumbnail,
					sourceUrl: myweb
				}
			}
		}, {
		...options
		})
	}
	
	XeonBotInc.sendFromOwner = async (jid, text, quoted, options = {}) => {
		for (const a of jid) {
			await XeonBotInc.sendMessage(a + '@s.whatsapp.net', { text, ...options }, { quoted });
		}
	}
	
	XeonBotInc.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
	
	XeonBotInc.sendTextMentions = async (jid, text, quoted, options = {}) => XeonBotInc.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
	
	XeonBotInc.sendAsSticker = async (jid, path, quoted, type, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
		if (options && (options.packname || options.author)) {
			buff = await writeExif(buff, options);
		} else {
			if (type === 'image') {
				buff = await imageToWebp(buff);
			} else if (type === 'video') {
				buff = await videoToWebp(buff);
			}
		}
		await XeonBotInc.sendMessage(jid, { sticker: { url: buff }, ...options }, { quoted });
		return buff;
	}
	
	XeonBotInc.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		const quoted = message.msg || message;
		const mime = quoted.mimetype || '';
		const messageType = (message.mtype || mime.split('/')[0]).replace(/Message/gi, '');
		const stream = await downloadContentFromMessage(quoted, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		const type = await FileType.fromBuffer(buffer);
		const trueFileName = attachExtension ? `${filename}.${type.ext}` : filename;
		await fs.promises.writeFile(trueFileName, buffer);
		return trueFileName;
	}
	
	XeonBotInc.getFile = async (PATH, save) => {
		let res
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		let type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		filename = path.join(__filename, '../XeonMedia/trash/' + new Date * 1 + '.' + type.ext)
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}
	
	XeonBotInc.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		const { mime, data, filename } = await XeonBotInc.getFile(path, true);
		const isWebpSticker = options.asSticker || /webp/.test(mime);
		let type = 'document', mimetype = mime, pathFile = filename;
		if (isWebpSticker) {
			const { writeExif } = require('../lib/exif');
			const media = { mimetype: mime, data };
			pathFile = await writeExif(media, {
				packname: options.packname || global.packname,
				author: options.author || global.author,
				categories: options.categories || [],
			})
			await fs.promises.unlink(filename);
			type = 'sticker';
			mimetype = 'image/webp';
		} else if (/image|video|audio/.test(mime)) {
			type = mime.split('/')[0];
		}
		await XeonBotInc.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options });
		return fs.promises.unlink(pathFile);
	}
	
	 XeonBotInc.sendButtonImage = async (jid, buttons, quoted, opts = {}) => {
      var image = await prepareWAMessageMedia({
         image: {
            url: opts && opts.image ? opts.image : ''
         }
      }, {
         upload: XeonBotInc.waUploadToServer
      })
      let message = generateWAMessageFromContent(jid, {
         viewOnceMessage: {
            message: {
               interactiveMessage: {
                  body: {
                     text: opts && opts.body ? opts.body : ''
                  },
                  footer: {
                     text: opts && opts.footer ? opts.footer : ''
                  },
                  header: {
                     hasMediaAttachment: true,
                     imageMessage: image.imageMessage,
                  },
                  nativeFlowMessage: {
                     buttons: buttons,
                     messageParamsJson: ''
                  }
               }
            }            
         }
      }, {
         quoted
      })
      return XeonBotInc.relayMessage(jid, message["message"], {
         messageId: message.key.id
      })
   }
   
   XeonBotInc.sendButtonVideo = async (jid, buttons, quoted, opts = {}) => {
      var video = await prepareWAMessageMedia({
         video: {
            url: opts && opts.video ? opts.video : ''
         }
      }, {
         upload: XeonBotInc.waUploadToServer
      })
      let message = generateWAMessageFromContent(jid, {
         viewOnceMessage: {
            message: {
               interactiveMessage: {
                  body: {
                     text: opts && opts.body ? opts.body : ''
                  },
                  footer: {
                     text: opts && opts.footer ? opts.footer : ''
                  },
                  header: {
                     hasMediaAttachment: true,
                     videoMessage: video.videoMessage,
                  },
                  nativeFlowMessage: {
                     buttons: buttons,
                     messageParamsJson: ''
                  }
               }
            }
         }
      }, {
         quoted
      })
      return XeonBotInc.relayMessage(jid, message["message"], {
         messageId: message.key.id
      })
   }
   
   XeonBotInc.sendList = async (jid, sections, quoted, opts = {}) => {
      let message = generateWAMessageFromContent(jid, {
         viewOnceMessage: {
            message: {
               interactiveMessage: {
                  header: {
                     title: opts && opts.header ? opts.header : ''
                  },
                  body: {
                     text: opts && opts.body ? opts.body : ''
                  },
                  nativeFlowMessage: {
                     buttons: [{
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                           title: opts && opts.title ? opts.title : '',
                           sections: sections
                        })
                     }],
                     messageParamsJson: ''
                  }
               }
            }
         }
      }, {
         quoted
      })
      XeonBotInc.relayMessage(jid, message["message"], {
         messageId: message.key.id
      })
   }
	
	XeonBotInc.sendListImage = async (jid, sections, quoted, opts = {}) => {
      var image = await prepareWAMessageMedia({
         image: {
            url: opts && opts.image ? opts.image : ''
         }
      }, {
         upload: XeonBotInc.waUploadToServer
      })
      let message = generateWAMessageFromContent(jid, {
         viewOnceMessage: {
            message: {
               interactiveMessage: {
                  header: {
                     title: opts && opts.header ? opts.header : '',
                     hasMediaAttachment: true,
                     imageMessage: image.imageMessage
                  },
                  body: {
                     text: opts && opts.body ? opts.body : ''
                  },
                  nativeFlowMessage: {
                     buttons: [{
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                           title: opts && opts.title ? opts.title : '',
                           sections: sections
                        })
                     }],
                     messageParamsJson: ''
                  }
               }
            }
         }
      }, {
         quoted
      })
      XeonBotInc.relayMessage(jid, message["message"], {
         messageId: message.key.id
      })
   }
	
	XeonBotInc.sendButtonMsg = async (jid, body = '', footer = '', title = '', media, buttons = [], quoted, options = {}) => {
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2,
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({ text: body }),
						footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
						header: proto.Message.InteractiveMessage.Header.fromObject({
							title,
							hasMediaAttachment: !!media,
							...(media ? await generateWAMessageContent({
								[media.type]: media.url ? { url: media.url } : media.data
							}, {
								upload: XeonBotInc.waUploadToServer
							}) : {})
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
							buttons: buttons.map(a => {
								return {
									name: a.name,
									buttonParamsJson: JSON.stringify(a.buttonParamsJson ? (typeof a.buttonParamsJson === 'string' ? JSON.parse(a.buttonParamsJson) : a.buttonParamsJson) : '')
								}
							})
						}),
						contextInfo: {
							forwardingScore: 10,
							isForwarded: true,
							forwardedNewsletterMessageInfo: {
								newsletterJid: global.xchannel.jid,
								serverMessageId: null,
								newsletterName: ownername
							}, 
							mentionedJid: options.mentions || [],
							...options.contextInfo,
							...(quoted ? {
								stanzaId: quoted.key.id,
								remoteJid: quoted.key.remoteJid,
								participant: quoted.key.participant || quoted.key.remoteJid,
								fromMe: quoted.key.fromMe,
								quotedMessage: quoted.message
							} : {})
						}
					})
				}
			}
		}, {});
		await XeonBotInc.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
	}
	
	XeonBotInc.sendCarouselMsg = async (jid, body = '', footer = '', cards = [], options = {}) => {
		async function getImageMsg(url) {
			const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: XeonBotInc.waUploadToServer });
			return imageMessage;
		}
		const cardPromises = cards.map(async (a) => {
			const imageMessage = await getImageMsg(a.url);
			return {
				header: {
					imageMessage: imageMessage,
					hasMediaAttachment: true
				},
				body: { text: a.body },
				footer: { text: a.footer },
				nativeFlowMessage: {
					buttons: a.buttons.map(b => ({
						name: b.name,
						buttonParamsJson: JSON.stringify(b.buttonParamsJson ? JSON.parse(b.buttonParamsJson) : '')
					}))
				}
			};
		});
		
		const cardResults = await Promise.all(cardPromises);
		const msg = await generateWAMessageFromContent(jid, {
			viewOnceMessage: {
				message: {
					messageContextInfo: {
						deviceListMetadata: {},
						deviceListMetadataVersion: 2
					},
					interactiveMessage: proto.Message.InteractiveMessage.create({
						body: proto.Message.InteractiveMessage.Body.create({ text: body }),
						footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
						carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
							cards: cardResults,
							messageVersion: 1
						})
					})
				}
			}
		}, {});
		await XeonBotInc.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
	}

	return XeonBotInc
}

async function Serialize(XeonBotInc, m, store) {
	const botNumber = XeonBotInc.decodeJid(XeonBotInc.user.id)
	if (!m) return m
	if (m.key) {
		m.id = m.key.id
		m.chat = m.key.remoteJid
		m.fromMe = m.key.fromMe
		m.isBaileys = m.id.startsWith('BAE5')
		m.isGroup = m.chat.endsWith('@g.us')
		m.sender = XeonBotInc.decodeJid(m.fromMe && XeonBotInc.user.id || m.participant || m.key.participant || m.chat || '')
	}
	if (m.message) {
		m.type = getContentType(m.message) || Object.keys(m.message)[0]
		m.msg = (/viewOnceMessage/i.test(m.type) ? m.message[m.type].message[getContentType(m.message[m.type].message)] : (extractMessageContent(m.message[m.type]) || m.message[m.type]))
		m.body = m.message?.conversation || m.msg?.text || m.msg?.conversation || m.msg?.caption || m.msg?.selectedButtonId || m.msg?.singleSelectReply?.selectedRowId || m.msg?.selectedId || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || m.msg?.name || ''
		m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
		m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || '';
		m.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : ''
		m.command = m.body && m.body.replace(m.prefix, '').trim().split(/ +/).shift()
		m.args = m.body?.trim().replace(new RegExp("^" + m.prefix?.replace(/[.*=+:\-?^${}()|[\]\\]|\s/g, '\\$&'), 'i'), '').replace(m.command, '').split(/ +/).filter(a => a) || []
		m.expiration = m.msg?.contextInfo?.expiration || 0
		m.timestamp = (typeof m.messageTimestamp === "number" ? m.messageTimestamp : m.messageTimestamp.low ? m.messageTimestamp.low : m.messageTimestamp.high) || m.msg.timestampMs * 1000
		m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath
		if (m.isMedia) {
			m.mime = m.msg?.mimetype
			m.size = m.msg?.fileLength
			m.height = m.msg?.height || ''
			m.width = m.msg?.width || ''
			if (/webp/i.test(m.mime)) {
				m.isAnimated = m.msg?.isAnimated
			}
		}
		m.quoted = m.msg?.contextInfo?.quotedMessage || null
		if (m.quoted) {
			m.quoted.message = extractMessageContent(m.msg?.contextInfo?.quotedMessage)
			m.quoted.type = getContentType(m.quoted.message) || Object.keys(m.quoted.message)[0]
			m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.device = getDevice(m.quoted.id)
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
			m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') : false
			m.quoted.sender = XeonBotInc.decodeJid(m.msg.contextInfo.participant)
			m.quoted.fromMe = m.quoted.sender === XeonBotInc.decodeJid(XeonBotInc.user.id)
			m.quoted.text = m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
			m.quoted.msg = extractMessageContent(m.quoted.message[m.quoted.type]) || m.quoted.message[m.quoted.type]
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.getQuotedObj = async () => {
				if (!m.quoted.id) return false
				let q = await store.loadMessage(m.chat, m.quoted.id, XeonBotInc)
				return await Serialize(XeonBotInc, q, store)
			}
			m.quoted.key = {
				remoteJid: m.msg?.contextInfo?.remoteJid || m.chat,
				participant: m.quoted.sender,
				fromMe: areJidsSameUser(XeonBotInc.decodeJid(m.msg?.contextInfo?.participant), XeonBotInc.decodeJid(XeonBotInc?.user?.id)),
				id: m.msg?.contextInfo?.stanzaId
			}
			m.quoted.isGroup = m.quoted.chat.endsWith('@g.us')
			m.quoted.mentions = m.quoted.msg?.contextInfo?.mentionedJid || []
			m.quoted.body = m.quoted.msg?.text || m.quoted.msg?.caption || m.quoted?.message?.conversation || m.quoted.msg?.selectedButtonId || m.quoted.msg?.singleSelectReply?.selectedRowId || m.quoted.msg?.selectedId || m.quoted.msg?.contentText || m.quoted.msg?.selectedDisplayText || m.quoted.msg?.title || m.quoted?.msg?.name || ''
			m.quoted.prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(m.quoted.body) ? m.quoted.body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : ''
			m.quoted.command = m.quoted.body && m.quoted.body.replace(m.quoted.prefix, '').trim().split(/ +/).shift()
			m.quoted.isMedia = !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath
			if (m.quoted.isMedia) {
				m.quoted.mime = m.quoted.msg?.mimetype
				m.quoted.size = m.quoted.msg?.fileLength
				m.quoted.height = m.quoted.msg?.height || ''
				m.quoted.width = m.quoted.msg?.width || ''
				if (/webp/i.test(m.quoted.mime)) {
					m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false
				}
			}
			m.quoted.fakeObj = proto.WebMessageInfo.fromObject({
				key: {
					remoteJid: m.quoted.chat,
					fromMe: m.quoted.fromMe,
					id: m.quoted.id
				},
				message: m.quoted,
				...(m.isGroup ? { participant: m.quoted.sender } : {})
			})
			m.quoted.download = async () => {
				const quotednya = m.quoted.msg || m.quoted;
				const mimenya = quotednya.mimetype || '';
				const messageType = (m.quoted.type || mimenya.split('/')[0]).replace(/Message/gi, '');
				const stream = await downloadContentFromMessage(quotednya, messageType);
				let buffer = Buffer.from([]);
				for await (const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk]);
				}
				return buffer
			}
			m.quoted.delete = () => {
				XeonBotInc.sendMessage(m.quoted.chat, {
					delete: {
						remoteJid: m.quoted.chat,
						fromMe: m.isBotAdmins ? false : true,
						id: m.quoted.id,
						participant: m.quoted.sender
					}
				})
			}
		}
	}
	
	m.download = async () => {
		const quotednya = m.msg || m.quoted;
		const mimenya = quotednya.mimetype || '';
		const messageType = (m.type || mimenya.split('/')[0]).replace(/Message/gi, '');
		const stream = await downloadContentFromMessage(quotednya, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		return buffer
	}
	
	m.copy = () => Serialize(XeonBotInc, proto.WebMessageInfo.fromObject(proto.WebMessageInfo.toObject(m)))
	
	m.reply = async (text, options = {}) => {
		const chatId = options?.chat ? options.chat : m.chat
		const caption = options.caption || '';
		const quoted = options?.quoted ? options.quoted : m
		try {
			if (/^https?:\/\//.test(text)) {
				const data = await axios.get(text, { responseType: 'arraybuffer' });
				const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data)).mime
				if (/gif|image|video|audio|pdf/i.test(mime)) {
					return XeonBotInc.sendFileUrl(chatId, text, caption, quoted, options)
				} else {
					return XeonBotInc.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
				}
			} else {
				return XeonBotInc.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
			}
		} catch (e) {
			return XeonBotInc.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
		}
	}

	return m
}

module.exports = { GroupUpdate, GroupParticipantsUpdate, MessagesUpsert, Solving }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
