const yts = require('yt-search');
const btchDownloader = require('btch-downloader'); // Assuming this is the correct import for the downloader

const handler = async (_0x78255f, { conn: _0xec7110, text: _0x12b642, usedPrefix: _0x4db40c, command: _0x23999c, Func: _0x3352fa }) => {
    if (!_0x12b642) return _0x78255f.reply(_0x3352fa.example(_0x4db40c, _0x23999c, 'Please provide a search term.'));

    _0x78255f.reply(global.status);

    try {
        let searchResults = await yts(_0x12b642);
        let video = searchResults.videos[0]; // Get the first video result

        // Prepare the response message
        let responseMessage = `*-* Title: ${video.title}\n`;
        responseMessage += `*-* Author: ${video.author.name}\n`;
        responseMessage += `*-* Video ID: ${video.videoId}\n`;
        responseMessage += `*-* Views: ${video.views}\n`;
        responseMessage += `*-* Published: ${video.ago}\n`;

        // Download music using btch-downloader
        const musicDownloadUrl = video.url; // Assuming the video URL is used for music download
        await btchDownloader.download(musicDownloadUrl); // Modify this line based on the actual usage of btch-downloader

        // Send the response message
        _0xec7110.sendMessage(_0x78255f.chat, { text: responseMessage });
    } catch (error) {
        return _0x78255f.reply(global.status.error);
    }
};

handler.command = ['play']; // Register the command
handler.limit = 3; // Set command limit
module.exports = handler;
