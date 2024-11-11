const loli = new (require('@fainshe/scrapers'))

module.exports = {
  run: async (m, { conn, Func }) => {
    // React to the message with a clock emoji
    m.react('🕒');

    // Send a waiting message
    let waitingMessage = await conn.sendMessage(m.chat, 'Please wait, fetching the AMV...', { quoted: m });

    // Fetch a random anime source
    let anu = await Func.random(['inferiordom', 'blubz_amv', '.kumui', 'yow_ph']);
    let search = await loli.tiktokSearch(anu);

    // Edit the waiting message to show the success message
    await conn.editMessage(waitingMessage.key, {
      text: `Here is your AMV: ${search.result.title}`,
      buttons: [{ buttonId: 'view', buttonText: { displayText: 'View AMV' }, type: 1 }],
    });

    // Send the AMV file
    conn.sendFile(m.chat, search.result.media.nowm, 'amv.mp4', search.result.title, m);
  },
  help: ['amv'],
  tags: ['tools'],
  command: /^(amv|storyanime)$/i
}