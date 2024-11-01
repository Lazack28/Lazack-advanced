let cp = require ('child_process')
let { promisify } = require ('util')

let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { conn}) => {
await conn.reply(m.chat, 'Chotto matte kudasai...', m)
    let o
    try {
        o = await exec('python3 speed.py --share --secure')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) conn.sendMessageModify(m.chat, stdout, m, { largeThumb: true, thumbnail: "https://telegra.ph/file/8978ca3a9e003ca6cbb99.jpg", title: `Speed test`, body: null, url: null })
        if (stderr.trim()) m.reply(stderr)
    }
}
handler.help = ['speedtest']
handler.tags = ['info']
handler.command = /^(speedtest|ookla)$/i

module.exports = handler