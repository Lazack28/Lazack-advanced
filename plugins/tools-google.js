const googleIt = require('google-it');

module.exports = {
  run: async (m, { conn, usedPrefix, command, text, Scraper, Func }) => {
    // Check if text is provided
    if (!text) return m.reply(Func.example(usedPrefix, command, 'example query'));

    // React to the message to indicate processing
    m.react('🕐');

    try {
      if (command === 'google') {
        // Perform a Google search
        let results = await googleIt({ query: text });
        
        // Check if results were found
        if (results.length === 0) return m.reply('No results found.');

        // Check for adult content in the query
        const adultKeywords = ['tetek', 'segs', 'hentai', 'bokep', 'tobrut', 'kontol', 'memek', 'pussy', 'cum', 'dick', 'fucking', 'blowjob', 'sex', 'sextoys', 'ngentot', 'ngewe', 'montok', 'ngocok', 'telanjang', '18+', 'penis', 'milf'];
        if (adultKeywords.some(word => text.toLowerCase().includes(word))) {
          return conn.reply(m.chat, Func.texted('bold', `Sorry, the search results you are looking for contain adult content.`), m);
        }

        // Construct the response message
        let responseText = `*[ GOOGLE ]*\n\n`;
        for (let result of results) {
          responseText += `${result.title}\n`;
          responseText += `*-* *Snippet* : ${result.snippet}\n`;
          responseText += `*-* *Link* : ${result.link}\n`;
          responseText += `°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n`;
        }
        m.reply(responseText);
      }

      if (command === 'gimage') {
        // Fetch Google images
        let imageResults = await Func.fetchJson(API('bt', '/googleimage', { query: text }));
        let randomImage = await Func.random(imageResults.result);
        
        // Check if any images were found
        if (!randomImage || randomImage.length === 0) return m.reply('No results found.');

        // Check for adult content in the query
        if (adultKeywords.some(word => text.toLowerCase().includes(word))) {
          return conn.reply(m.chat, Func.texted('bold', `Sorry, the search results you are looking for contain adult content.`), m);
        }

        // Send the image as a response
        conn.sendFile(m.chat, randomImage, 'google.jpg', `Result from: ${text}`, m);
      }
    } catch (e) {
      console.error(e);
      m.reply('An error occurred while processing your request. Please try again later.');
    }
  },
  help: ['google', 'gimage'],
  use: 'query',
  tags: ['tools'],
  command: /^(google|gimage)$/i,
  limit: true
};