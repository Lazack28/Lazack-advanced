let cp = require('child_process'); // Import the child_process module to execute shell commands
let { promisify } = require('util'); // Import promisify from util to convert callback-based functions to promises

// Promisify the exec function to use async/await syntax
let exec = promisify(cp.exec).bind(cp);

// Define the handler function
let handler = async (m, { conn }) => {
    // Send a reply indicating that the process is ongoing
    await conn.reply(m.chat, 'Please wait a moment...', m);

    let o; // Variable to hold the output of the command execution
    try {
        // Execute the Python script for speed testing
        o = await exec('python3 speed.py --share --secure');
    } catch (e) {
        // If an error occurs, store the error object
        o = e;
    } finally {
        // Destructure the output to get stdout and stderr
        let { stdout, stderr } = o;

        // If there is output from stdout, send it as a message with a thumbnail
        if (stdout.trim()) {
            conn.sendMessageModify(m.chat, stdout, m, {
                largeThumb: true,
                thumbnail: "https://telegra.ph/file/8978ca3a9e003ca6cbb99.jpg",
                title: `Speed Test`, // Title of the message
                body: null, // Body of the message (null means no body text)
                url: null // URL (null means no URL)
            });
        }
        
        // If there is output from stderr, reply with the error message
        if (stderr.trim()) {
            m.reply(stderr);
        }
    }
}

// Define the help command and its tags
handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest|test)$/i; // Command pattern for matching

// Export the handler module
module.exports = handler;