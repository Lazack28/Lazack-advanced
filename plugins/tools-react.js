let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Define an array of emojis
    const emojis = ['😀', '😂', '😍', '😢', '😎', '😡', '🥳', '🤔', '🤖', '👻'];

    // Check if the command is for random reaction
    if (command === 'react') {
        // Select a random emoji from the array
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Check if there is a quoted message
        if (!m.quoted) return m.reply('Reply to the message!');

        // Send the random emoji as a reaction to the quoted message
        conn.relayMessage(m.chat, {
            reactionMessage: {
                key: {
                    id: m.quoted.id,
                    remoteJid: m.chat,
                    fromMe: true
                },
                text: randomEmoji // Use the random emoji here
            }
        }, { messageId: m.id });
    } else {
        // If text is provided, react with the provided text
        if (!text) return m.reply('Please provide text to react with.');
        if (!m.quoted) return m.reply('Reply to the message!');
        conn.relayMessage(m.chat, {
            reactionMessage: {
                key: {
                    id: m.quoted.id,
                    remoteJid: m.chat,
                    fromMe: true
                },
                text: text
            }
        }, { messageId: m.id });
    }
}

handler.help = handler.command = ['react']
handler.tags = ['tools']

module.exports = handler;