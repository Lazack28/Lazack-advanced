let handler = async (m, { conn, usedPrefix, command, Func }) => {
  m.react('🕒')
  let lolii = await Func.fetchJson('https://raw.githubusercontent.com/Im-Dims/Database-doang-sih/master/loli.json')
  let urlnya = lolii[Math.floor(Math.random() * lolii.length)]
  let btns = [{
    name: 'open_webview',
    buttonParamsJson: JSON.stringify({
      link: {
        in_app_webview: true,
        url: "https://id.pinterest.com/search/pins/?rs=ac&len=2&q=loli+gothic+fanart",
        success_url: 'https://dinorunner.com/success',
        cancel_url: "https://id.pinterest.com/search/pins/?rs=ac&len=2&q=loli+gothic+fanart"
      }
    })
  }] 
  conn.sendIAMessage(m.chat, btns, m, {
    header: '',
    content: "Pedo pedoo",
    footer: global.footer,
    media: urlnya
  })
}
handler.help = handler.command = ['loli']
handler.tags = ['fun']
handler.limit = true

module.exports = handler