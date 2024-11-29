// upload to github, di buat oleh siapa ya kira kira 🙄🙄
const axios = require('axios')
const fs = require('fs')

module.exports = {
  run: async (m, { conn, text, usedPrefix, command }) => {
    try {
      const githubToken = 'GITHAB_TOKEN'
      const owner = 'OWNER_NAME'
      const repo = 'REPO WOY'
      const branch = 'main'

      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (!mime) return m.reply('No media found')
      m.react('⌛')

      let media = await q.download()
      let fileName = `${Date.now()}.${mime.split('/')[1]}`
      let filePath = `uploads/${fileName}`

      let base64Content = Buffer.from(media).toString('base64')

      let response = await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        message: `Upload file ${fileName}`, 
        content: base64Content,
        branch: branch,
      }, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
        },
      })

      let rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`
      m.reply(`File berhasil diupload ke GitHub!\nRaw URL: ${rawUrl}`)
    } catch (e) {
      console.error(e)
      return conn.reply(m.chat, `Error: ${e.message}`, m)
    }
  },
  help: ['uploadtogithub'],
  tags: ['tools'],
  command: /^(uploadtogithub)$/i,
  limit: true
        }
