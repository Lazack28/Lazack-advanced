let handler = async (m, { conn }) => {
  if (!m.quoted) {
    await conn.sendMessage(m.chat, { text: "Reply to the audio message you want to send!" });
    return;
  }
  const qted = m.quoted;
  const mime = (qted.mimetype || "").toLowerCase();
  if (!/^audio\//.test(mime)) {
    await conn.sendMessage(m.chat, { text: "The file you replied to must be an audio!" });
    return;
  }
  const newsletterJid = "120363404741298748@newsletter";
  await conn.sendMessage(m.chat, { react: { text: "🔄", key: m.key } }); // loading reaction
  try {
    const buff = await qted.download();
    if (!buff) {
      await conn.sendMessage(m.chat, { text: "Failed to download audio." });
      await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
      return;
    }
    await conn.sendMessage(newsletterJid, { audio: buff, mimetype: "audio/mp4", ptt: true }); // send audio to channel
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
    await conn.sendMessage(m.chat, { text: "Successfully sent audio to the channel ✅" });
  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { text: `An error occurred: ${e.message}` });
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
  }
};
handler.help = ["hoo"];
handler.tags = ["owner"];
handler.command = ["upch"];
export default handler;