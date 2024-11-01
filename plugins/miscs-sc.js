const fetch = require("node-fetch")
const { generateWAMessageFromContent } = require("@whiskeysockets/baileys")

let handler = async (m, { conn }) => {
let msg = await generateWAMessageFromContent(m.chat, {
  locationMessage: {
    degreesLatitude: 0,
    degreesLongitude: 0,
    name: "Iochi Mari",
    address: "Hayoo mau ngapain??",
    url: "api.ssateam.my.id",
    isLive: true,
    accuracyInMeters: 0,
    speedInMps: 0,
    degreesClockwiseFromMagneticNorth: 2,
    comment: "Your Welcome",
    jpegThumbnail: await conn.resize("https://telegra.ph/file/dca03350051cd6a971be3.jpg", 300, 300),
  },
}, { quoted: m })

return conn.relayMessage(m.chat, msg.message, {})
}
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = ['sc', 'sourcecode']

module.exports = handler