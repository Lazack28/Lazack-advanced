
const axios = requre('axios')
const cheerio = require('cheerio')
const qs = require ('qs')

let handler = async (m, { conn, text, usedPrefix, command, isOwner, Func }) => {
  if (!text) return m.reply(func.example(usedPrefix, command, 'enter link'));

  try {
    const getData = async (videoUrl) => {
      const config = {
        method: 'GET',
        url: `https://ytconvert.pro/button/?url=${encodeURIComponent(videoUrl)}`,
        headers: {
          'User -Agent': 'Mozilla/5.0',
          'Accept': 'text/html',
        },
      };

      const response = await axios.request(config);
      return response.data;
    };

    const audioJob = async (videoUrl) => {
      const html = await getData(videoUrl);
      const $ = cheerio.load(html);
      const tokenId = $('button#dlbutton').data('token_id');
      const tokenValidTo = $('button#dlbutton').data('token_validto');
      const title = $('button#dlbutton div').text().trim();

      if (!tokenId || !tokenValidTo) {
        throw new Error('Token tidak valid atau tidak ditemukan.');
      }

      const data = qs.stringify({
        url: videoUrl,
        convert: 'gogogo',
        token_id: tokenId,
        token_validto: tokenValidTo,
      });

      const postConfig = {
        method: 'POST',
        url: 'https://ytconvert.pro/convert/',
        headers: {
          'User -Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
      };

      const postResponse = await axios.request(postConfig);
      const jobid = postResponse.data.jobid;

      if (!jobid) {
        throw new Error('Job ID tidak ditemukan.');
      }

      const audio = await getAudio(jobid);
      return { success: true, title, audio };
    };

    const getAudio = async (jobid) => {
      const config = {
        method: 'GET',
        url: `https://ytconvert.pro/convert/?jobid=${jobid}`,
        headers: {
          'User -Agent': 'Mozilla/5.0',
          'Accept': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (!response.data || !response.data.download_link) {
        throw new Error('Audio tidak tersedia.');
      }

      return response.data.download_link;
    };

    m.reply("⏳ Sedang memproses unduhan...");

    const { title, audio } = await audioJob(text);

    await conn.sendMessage(m.chat, { text: `🎶 ${title}\n> Your Music Is In Process` }, { quoted: m });
    await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mpeg' }, { quoted: m }); 
  } catch (e) {
    console.error(e);
    m.reply("Terjadi kesalahan saat mencoba mengunduh audio.");
  }
};

handler.help = ['ytmp3']
handler.tags = ['downloader']
handler.command = ['ytm', 'ply']
handler.limit = true;

module.exports = handler;
