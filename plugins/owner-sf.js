const fs = require('fs')
const syntaxError = require('syntax-error')
const path = require('path')
const util = require('util')
const _fs = fs.promises

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
  if (!text) return m.reply(`Where is the path?, Example: ${usedPrefix + command} plugins/menu.js`)
  if (!m.quoted) return m.reply('Reply code!')
  if (/p(lugin)?/i.test(command)) {
    let filename = text.replace(/plugin(s)\//i, '') + (/\.js$/i.test(text) ? '' : '.js')
    const error = syntaxError(m.quoted.text, filename, {
      sourceType: 'module',
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true
    })
    if (error) return m.reply(error)
    const pathFile = path.join(__dirname, filename)
    // TODO: make confirmation to save if file already exists
    // if (fs.existSync(pathFile, fs.constants.R_OK)) return m.reply(`File ${filename} sudah ada`)
    await _fs.writeFile(pathFile, m.quoted.text)
    m.reply(`
Successful save in *${filename}*

Javascript\`\`\`
${util.format(m.quoted.text)}
\`\`\`
`.trim())
  } else {
    const isJavascript = m.quoted.text && !m.quoted.mediaMessage && /\.js/.test(text)
    if (isJavascript) {
      const error = syntaxError(m.quoted.text, text, {
        sourceType: 'module',
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true
      })
      if (error) return m.reply(error)
      await _fs.writeFile(text, m.quoted.text)
      m.reply(`
Successful save in *${text}*

Javascript\`\`\`
${util.format(m.quoted.text)}
\`\`\`
`.trim())
    } else if (m.quoted.mediaMessage) {
      const media = await m.quoted.download()
      await _fs.writeFile(text, media)
      m.reply(`Successful save in *${text}*`.trim())
    } else {
      return m.reply('Not Supported!!')
    }
  }
}
handler.help = ['saveplugin']
handler.tags = ['owner']
handler.command = /^(sf|saveplugin)$/i
handler.rowner = true

module.exports = handler