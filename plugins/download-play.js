const yts = require('yt-search')
const { youtube } = require('btch-downloader')

const handler = async (m, { conn, text, usedPrefix, command, Func }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'pwita'));

  m.reply("🔄 Please wait while I fetch the audio...");
  try {
    const search = await yts(text); // Search for the video
    const video = search.videos[0];

    if (!video) return m.reply("❌ No results found! Please try again with a different query.");
    if (video.seconds >= 3600) return m.reply("❌ Video duration exceeds 1 hour. Please choose a shorter video!");

    // Attempt to get the audio URL
    let audioUrl;
    try {
      audioUrl = await youtube(video.url);
    } catch (error) {
      return m.reply("⚠️ Failed to fetch audio. Please try again later.");
    }

    // Send audio file
    conn.sendMessage(
      m.chat,
      {
        audio: { url: audioUrl.mp3 },
        mimetype: "audio/mpeg",
        contextInfo: {
          externalAdReply: {
            title: video.title,
            body: "",
            thumbnailUrl: video.image,
            sourceUrl: video.url,
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: m }
    );
  } catch (error) {
    m.reply(`❌ Error: ${error.message}`);
  }
};

handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = ['play'];
handler.limit = 3

module.exports = handler;
