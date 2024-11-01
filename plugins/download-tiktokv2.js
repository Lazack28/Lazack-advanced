const cheerio = require('cheerio');
const axios = require('axios');

let handler = async (m, { usedPrefix, command, args, Func }) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://vt.tiktok.com/ZSYaEoF55'))
  if (!args[0].match('tiktok.com')) return m.reply(global.status.invalid)
  m.react('🕐')
  try {
    const { isSlide, result, title, author } = await tiktok(args[0]);
    if (isSlide) {
      m.reply('Foto slide akan di kirim ke private chat!');
      for (let img of result) {
        await conn.sendFile(m.sender, img, Func.filename('jpg'), '', null);
        await Func.delay(2000);
      }
    } else {
      await conn.sendMessage(m.chat, { video: { url: result }, caption: `${title} (${author})` }, { quoted: m });
    }
  } catch (e) {
    return m.reply(Func.jsonFormat(e))
  }
};
handler.help = ['tiktokv2', 'tiktokslidev2'].map(v => v + ' *url*')
handler.tags = ['downloader']
handler.command = ['tiktokv2', 'ttv2', 'ttslidev2', 'tiktokslidev2']
handler.limit = 4;

module.exports = handler;

async function tiktok(url) {
    try {
        const data = new URLSearchParams({
            'id': url,
            'locale': 'id',
            'tt': 'RFBiZ3Bi'
        });

        const headers = {
            'HX-Request': true,
            'HX-Trigger': '_gcaptcha_pt',
            'HX-Target': 'target',
            'HX-Current-URL': 'https://ssstik.io/id',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://ssstik.io/id'
        };

        const response = await axios.post('https://ssstik.io/abc?url=dl', data, {
            headers
        });
        const html = response.data;

        const $ = cheerio.load(html);

        const author = $('#avatarAndTextUsual h2').text().trim();
        const title = $('#avatarAndTextUsual p').text().trim();
        const video = $('.result_overlay_buttons a.download_link').attr('href');
        const audio = $('.result_overlay_buttons a.download_link.music').attr('href');
        const imgLinks = [];
        $('img[data-splide-lazy]').each((index, element) => {
            const imgLink = $(element).attr('data-splide-lazy');
            imgLinks.push(imgLink);
        });

        const result = {
            isSlide: video ? false : true,
            author,
            title,
            result: video || imgLinks,
            audio
        };
        return result
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}