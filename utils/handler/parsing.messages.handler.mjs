import baileys from 'baileys'
import configs from '../../Setting/settings.mjs'
const { proto, downloadContentFromMessage, getContentType, getDevice } = baileys

const dlMessage = async (message) => {
  try {
    let mime = (message.msg || message).mimetype || ""
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
    return buffer
  } catch (e) {
    console.log(e)
  }
}

// jangan di utek utek coii, biarin aja ini
const parsingMessagesHandler = (serve, m, s) => {
  try {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
      m.id = m.key.id
      m.isBot = (m.id.endsWith("WBSF")) || (m.id.startsWith('AKIRA')) || (m.id.startsWith("VRDN")) || (m.id.startsWith("SSA")) || (m.id.startsWith('B1EY') && m.id.length === 20) || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('3EB0') && (m.id.length === 22 || m.id.length === 40))
      m.typeBaileys = (m.id.endsWith("WBSF")) ? "@wibusoft/baileys" : (m.id.startsWith('AKIRA')) ? "github:LT-SYAII/Bail" : (m.id.startsWith("VRDN")) ? "@client/baileys" : (m.id.startsWith("SSA")) ? "@Lazack/baileys-md" : (m.id.startsWith('B1EY') && m.id.length === 20) ? "github:@nstar-y/Bail" : (m.id.startsWith('BAE5') && m.id.length === 16) ? "@whiskeysockets/baileys@^6.6.0" : (m.id.startsWith('3EB0') && (m.id.length === 22 || m.id.length === 40)) ? "@whiskeysockets/baileys" : "no libary"
      m.userDevice = (m.id.endsWith("WBSF")) || (m.id.startsWith('AKIRA')) || (m.id.startsWith("VRDN")) || (m.id.startsWith("SSA")) || (m.id.startsWith('B1EY') && m.id.length === 20) || (m.id.startsWith('BAE5') && m.id.length === 16) || (m.id.startsWith('3EB0') && (m.id.length === 22 || m.id.length === 40)) ? "web" : getDevice(m.id)
      m.chat = m.key.remoteJid
      m.fromMe = m.key.fromMe
      m.isGc = m.chat.endsWith('@g.us')
      m.isPc = m.chat.endsWith('@s.whatsapp.net')
      m.isNewsletter = m.chat.endsWith('@newsletter')
      if (m.isGc) m.participant = serve.createJid(m.key.participant) || ""
      m.sender = serve.createJid((m.fromMe && serve.user.id) || m.participant || m.key.participant || m.chat || "")
      m.isOwn = configs.developer.map((v) => v + configs.idwa).includes(m.sender)
      m.isDev = configs.dev.map((v) => v + configs.idwa).includes(m.sender)
      m.isMod = configs.moderator.map((v) => v + configs.idwa).includes(m.sender)
    }
    if (m.message) {
      if (m?.message?.messageContextInfo) delete m.message.messageContextInfo
      if (m?.message?.senderKeyDistributionMessage) delete m.message.senderKeyDistributionMessage
      m.mtype = getContentType(m.message) /*Dapatkan dan meng Inisialisasi content ambil dari baileys*/
      m.msg = m.mtype == "viewOnceMessageV2" ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype]
      if (m.message["call"]) return
      let quntul = (m.quoted = m.msg?.contextInfo ? m.msg.contextInfo.quotedMessage : null)
      m.mentionedJid = m.msg?.contextInfo ? m.msg?.contextInfo?.mentionedJid : []
      m.react = m.mtype == "reactionMessage" ? m.message[m.mtype] : null
      if (m.react) {
        m.rkey = m.message[m.mtype].key
        m.rchat = m.message[m.mtype].key.remoteJid
        m.rfromMe = m.message[m.mtype].key.fromMe
        m.rId = m.message[m.mtype].key.id
        m.rtext = m.message[m.mtype].text
        m.rtime = m.message[m.mtype].senderTimestampMs
        m.rtarget = m.isGc ? m.message[m.mtype].key.participant : ""
      }
      if (m.msg?.url) m.download = () => dlMessage(m.msg)
      if (m.quoted) {
        let type = Object.keys(m.quoted)[0]
        m.quoted = m.quoted[type]
        if (["productMessage"].includes(type)) {
          (type = Object.keys(m.quoted)[0]), (m.quoted = m.quoted[type])
        }
        if (typeof m.quoted === "string") m.quoted = { text: m.quoted }
        m.quoted.mtype = type
        m.quoted.id = m.msg.contextInfo.stanzaId
        m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
        m.quoted.isBot = m.quoted.id ? (m.quoted.id.endsWith("WBSF")) || (m.quoted.id.startsWith('AKIRA')) || (m.quoted.id.startsWith("VRDN")) || (m.quoted.id.startsWith("SSA")) || (m.quoted.id.startsWith('B1EY') && m.quoted.id.length === 20) || (m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16) || (m.quoted.id.startsWith('3EB0') && (m.quoted.id.length === 22 || m.quoted.id.length === 40)) : false
        m.quoted.typeBaileys = m.quoted.id ? (m.quoted.id.endsWith("WBSF")) ? "@wibusoft/baileys" : (m.quoted.id.startsWith('AKIRA')) ? "github:LT-SYAII/Bail" : (m.quoted.id.startsWith("VRDN")) ? "@client/baileys" : (m.quoted.id.startsWith("SSA")) ? "@Lazack/baileys-md" : (m.quoted.id.startsWith('B1EY') && m.quoted.id.length === 20) ? "github:@nstar-y/Bail" : (m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16) ? "@whiskeysockets/baileys@^6.6.0" : (m.quoted.id.startsWith('3EB0') && (m.quoted.id.length === 22 || m.quoted.id.length === 40)) ? "@whiskeysockets/baileys" : "no libary" : null
        m.quoted.userDevice = m.quoted.id ? (m.quoted.id.endsWith("WBSF")) || (m.quoted.id.startsWith('AKIRA')) || (m.quoted.id.startsWith("VRDN")) || (m.quoted.id.startsWith("SSA")) || (m.quoted.id.startsWith('B1EY') && m.quoted.id.length === 20) || (m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16) || (m.quoted.id.startsWith('3EB0') && (m.quoted.id.length === 22 || m.quoted.id.length === 40)) ? "web" : getDevice(m.quoted.id) : null
        m.quoted.fromMe = m.quoted.sender === (serve.user && serve.user.id)
        m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ""
        m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
        m.quoted.download = () => dlMessage(m.quoted)
        m.getQuotedObj = m.getQuotedMessage = async () => {
          if (!m.quoted.id) return false
          let q = await s.loadMessage(m.chat, m.quoted.id, serve)
          return parser(serve, q, s)
        }
        let vM = (m.quoted.fakeObj = M.fromObject({
          key: {
            remoteJid: m.quoted.chat,
            fromMe: m.quoted.fromMe,
            id: m.quoted.id
          },
          message: quntul,
          ...(m.isGc ? { participant: m.quoted.sender } : { participant: undefined })
        }))
      }
      m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || ""
      let cmdd = m.mtype === "conversation" ? m.message.conversation : m.mtype == "imageMessage" ? m.message.imageMessage.caption : m.mtype == "videoMessage" ? m.message.videoMessage.caption : m.mtype == "extendedTextMessage" ? m.message.extendedTextMessage.text : "".slice(1).trim().split(/ +/).shift().toLowerCase()
      m.preff = /^[/\.!#]/.test(cmdd) ? cmdd.match(/^[/\.!#]/) : "/"
      m.cmd = m.mtype === "conversation" && m.message.conversation.startsWith(m.preff) ? m.message.conversation : m.mtype == "imageMessage" && m.message.imageMessage.caption.startsWith(m.preff) ? m.message.imageMessage.caption : m.mtype == "videoMessage" && m.message.videoMessage.caption.startsWith(m.preff) ? m.message.videoMessage.caption : m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.text.startsWith(m.preff) ? m.message.extendedTextMessage.text : m.mtype == "buttonsResponseMessage" && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : m.mtype == "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId : m.mtype == "templateButtonReplyMessage" && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
      m.args = m.cmd.trim().split(/ +/).slice(1)
      m.query = m.args.join(" ")
      m.command = m.cmd.slice(1).trim().split(/ +/).shift().toLowerCase()
    }
    return m
  } catch (e) {
    console.log(e)
  }
}

export { dlMessage }
export default parsingMessagesHandler