const axios = require('axios')
const cheerio = require('cheerio')

const handler = async (m, { Func, conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'Iochi mari'));
  m.react("🕓");
  const result = await pinterest(text);
  if (['tetek', 'segs', 'hentai', 'bokep', 'tobrut', 'kontol', 'memek', 'pussy', 'cum', 'dick', 'fucking', 'blowjob', 'sex', 'sextoys', 'ngentot', 'ngewe', 'montok', 'ngocok', 'telanjang', '18+', 'penis', 'milf'].some(word => text.includes(word))) {
    return conn.reply(m.chat, Func.texted('bold', `Sorry sensei the search results you are looking for contain 18+`), m);
  }
  if (result.length === 0) return m.reply('Unable to retrieve data');
  let { key } = await conn.sendFile(m.chat, result[0], 'pinterest.jpg', `*[ Pinterest ]*\n\n*-* *Result :* ${text}\n*-* *Image link :* ${result[0]}\n_Gunakan command *nextpin* untuk melihat gambar selanjutnya_\n\n${global.footer}`, m);
  conn.pin[m.sender] = { key, result, text, index: 0, wait: Date.now() + 5000 };
};

handler.before = async function (m, { conn }) {
  conn.pin = conn.pin ? conn.pin : {};
  if (m.isBaileys || !(m.sender in conn.pin)) return;
  const { key, result, text, index, wait } = conn.pin[m.sender];
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
  if (/(nextpin)/gi.test(m.text.toLowerCase())) {
  m.react("🕓");
    if (Date.now() >= wait) {
      const li = index + 1;
      if (!result || li >= result.length) {
      m.reply("Tidak ada gambar Pinterest selanjutnya.");
      delete conn.pin[m.sender];
      return
      }
      const res = result[li];
      conn.pin[m.sender].index = li;
      conn.pin[m.sender].wait = Date.now() + 5000;
      conn.pin[m.sender].key = (await conn.sendFile(m.chat, res, 'pinterest.jpg', `*[ Pinterest ]*\n\n*-* *Result :* ${text}\n*-* *Image link :* ${res}\n*-* *Gambar ke:* ${conn.pin[m.sender].index}\n_Gunakan command *nextpin* untuk melihat gambar selanjutnya_\n\n${global.footer}`, m)).key
    } else {
      const countdown = Math.floor((wait - Date.now()) / 1000);
      m.reply(`Tunggu sebentar, Sensei! masih ${countdown} detik lagi.`);
    }
  }
};
handler.help = ["pinterest"];
handler.tags = ["downloader"];
handler.command = ['pinterest', 'pin'];
handler.limit = true;

module.exports = handler;

async function pinterest(query) {
  return new Promise(async (resolve, reject) => {
    const userAgent = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36';

    axios.get('https://id.pinterest.com/', {
      headers: {
        'User-Agent': userAgent
      }
    })
    .then(response => {
      const setCookieHeader = response.headers['set-cookie'];
      const cookie = setCookieHeader.map(c => c.split(';')[0]).join('; ');

      axios.get(`https://id.pinterest.com/search/pins/?autologin=true&q=${query}`, {
        headers: {
          'User-Agent': userAgent,
          'Cookie': cookie
        }
      })
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = [];

        $('div > a').get().map(b => {
          const link = $(b).find('img').attr('src');
          if (link) result.push(link.replace(/236/g, '736'));
        });

        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
    })
    .catch(error => {
      reject(error);
    });
  });
}