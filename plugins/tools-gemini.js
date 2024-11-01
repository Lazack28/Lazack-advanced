const fetch = require('node-fetch')

const handler = async (m, { text, conn, usedPrefix, command, Func, Scraper }) => {
  if (!text && !m.quoted) return m.reply(Func.example(usedPrefix, command, 'hai'));
  m.react('🕒')
  try {
    if (text && m.quoted && (m.quoted.mimetype === 'image/jpeg' || m.quoted.mimetype === 'image/png' || m.quoted.mimetype === 'video/mp4' || m.quoted.mimetype === 'application/pdf' || m.quoted.mimetype === 'audio/mpeg')) {
      const img = await m.quoted.download()
      const image = await Scraper.uploader(img)
      const response = await fetch('https://rest.cifumo.biz.id/api/ai/gemini-image', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ask: text,
          image: image.data.url,
        }),
      })
      const data = await response.json()
      await conn.reply(m.chat, data.content, m)
    } else if (text) {
      const response = await fetch(`https://rest.cifumo.biz.id/api/ai/gemini-chat?ask=${encodeURIComponent(text)}`)
      const data = await response.json()
      await conn.reply(m.chat, data.data, m)
    }
  } catch (e) {
    console.log(e)
    return m.reply(global.status.error)
  }
}
handler.help = handler.command = ['gemini']
handler.tags = ['tools']
handler.limit = true

module.exports = handler