import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import { Readable } from "stream";

let handler = async (m, { conn }) => {
  // Check if the message is a reply
  if (!m.quoted) {
    return "Reply to an audio or video message you want to send to the channel!";
  }

  const qted = m.quoted;
  const mime = (qted.mimetype || "").toLowerCase();

  // Validate media type (audio/video)
  if (!/(video\/(mp4|webm|ogg|quicktime|3gpp|mpeg))|(audio\/(mpeg|ogg|opus|wav|webm|mp3))/.test(mime)) {
    return "The file you replied to must be an audio or video.";
  }

  // React with "loading" emoji
  await conn.sendMessage(m.chat, { react: { text: "🔄", key: m.key } });

  // Download the media
  const media = await qted.download();
  if (!media) {
    throw "Failed to download media.";
  }

  const newsletterJid = "120363404741298748@newsletter";

  try {
    // Convert the media to Opus audio using FFmpeg
    const audioBuffer = await new Promise((resolve, reject) => {
      const inputStream = Readable.from(media);
      const chunks = [];

      const ffmpegProcess = ffmpeg(inputStream)
        .setFfmpegPath(ffmpegStatic)
        .noVideo()
        .audioCodec("libopus")
        .format("opus")
        .outputOptions(["-vn", "-ar 48000", "-ac 2", "-b:a 128k"])
        .on("error", reject)
        .pipe();

      ffmpegProcess.on("data", chunk => chunks.push(chunk));
      ffmpegProcess.on("end", () => resolve(Buffer.concat(chunks)));
    });

    // Send converted audio to newsletter channel
    await conn.sendMessage(newsletterJid, {
      audio: audioBuffer,
      mimetype: "audio/ogg; codecs=opus",
      ptt: true
    });

    // React with success
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    throw `An error occurred during audio conversion: ${e.message}`;
  }
};

handler.help = ["sendaudio"];
handler.tags = ["owner"];
handler.command = ["woii"];

export default handler;