const fetch = require("node-fetch");
const link = 'https://data.bmkg.go.id/DataMKG/TEWS/';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    // Fetch earthquake data
    let res = await fetch(link + 'autogempa.json');
    let data = await res.json();
    let earthquakeInfo = data.Infogempa.gempa;

    // Prepare the message text in English
    let messageText = `*Location:* ${earthquakeInfo.Wilayah}\n\n`;
    messageText += `Date: ${earthquakeInfo.Tanggal}\n`;
    messageText += `Time: ${earthquakeInfo.Jam}\n`;
    messageText += `Potential: *${earthquakeInfo.Potensi}*\n\n`;
    messageText += `Magnitude: ${earthquakeInfo.Magnitude}\n`;
    messageText += `Depth: ${earthquakeInfo.Kedalaman}\n`;
    messageText += `Coordinates: ${earthquakeInfo.Coordinates}`;

    // Include felt reports if available
    if (earthquakeInfo.Dirasakan.length > 3) {
      messageText += `\nFelt Reports: ${earthquakeInfo.Dirasakan}`;
    }

    // Send the message with an image of the shakemap
    await conn.sendMessage(m.chat, { 
      image: { url: link + earthquakeInfo.Shakemap }, 
      caption: messageText 
    }, { quoted: m });
    
  } catch (e) {
    console.error(e);
    return m.reply(`Feature Error.`);
  }
};

handler.help = ['earthquake'];
handler.tags = ['tools'];
handler.command = /^(earthquake|infoearthquake)$/i;
handler.limit = true;

module.exports = handler;