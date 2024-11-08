
const axios = require('axios');

let handler = async (m, { conn, usedPrefix, command, args, Func }) => {
  if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://youtube'));
  if (!args[0].match('youtube.com')) return m.reply(global.status.invalid);
  
  m.react('🕒');
  
  try {
    // Replace with your actual API endpoint
    const apiUrl = 'https://itzpire.com/download/youtube'; 
    const response = await axios.post(apiUrl, {
      url: args[0]
    });

    // Assuming the API response structure
    const { title, thumbnail, audioUrl } = response.data;

    // Send the thumbnail and title
    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: title }, { quoted: m });
    
    // Send the audio file
    await conn.sendMessage(m.chat, { audio: { url: audioUrl }, fileName: title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: m });
    
    // Send the audio as a downloadable document
    await conn.sendFile(m.chat, audioUrl, title + '.mp3', 'Here is the document version!', m, {
      document: true,
      mimetype: 'audio/mpeg',
      fileName: title + '.mp3'
    });
    
  } catch (e) {
    console.error(e); // Log the error for debugging
    return m.reply(global.status.error);
  }
}

handler.help = ['yta'].map(v => v + ' *url*');
handler.tags = ['downloader'];
handler.command = ['yta', 'ytm3', 'ytaudio'];
handler.limit = true;

module.exports = handler;
