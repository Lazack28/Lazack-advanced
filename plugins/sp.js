const axios = require ("axios");

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Enter the Spotify track or playlist title!\nExample: *${usedPrefix + command} Faded*`);
  }

 await m.reply("🔄 🎧 bot is fetching your playlist from Spotify! 🤩...");

  try {
    // Spotify search API
    const searchApiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(text)}`;
    const searchData = (await axios.get(searchApiUrl)).data;

    if (searchData.length === 0) {
      return m.reply("❌ No Spotify results found. Please try again with a valid title or query.");
    }

    // Construct playlist message
    let playlistMessage = `_🎶 SPOTIFY PLAYLIST 🎶_\n\n`;
    for (const track of searchData) {
      playlistMessage += `- *Title*: ${track.title}\n`;
      playlistMessage += `  *Artist*: ${track.artist || "Unknown"}\n`;
      playlistMessage += `  *Album*: ${track.album || "Unknown"}\n`;
      playlistMessage += `  *URL*: ${track.url}\n\n`;
    }

    // Send the playlist message
    conn.sendMessage(
      m.chat,
      {
        text: playlistMessage,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            showAdAttribution: true,
            title: "Advance Spotify Playlist",
            body: "LAZACK SPOTIFY SEARCH",
            thumbnailUrl: "https://i.imgur.com/9ZgmMuf.mp4", // Example thumbnail
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  } catch (error) {
    m.reply(`❌ encountered an error: ${error.message}`);
    console.error(error);
  }
};

handler.help = ["sps"];
handler.tags = ["spotify"];
handler.command = ['sps'];
handler.limit = 3

module.exports = handler;
