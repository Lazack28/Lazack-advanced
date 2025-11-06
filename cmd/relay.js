

import "../../settings/config.js";
import * as jimp from "jimp";

let handler = async (m, { conn, pushName, runtime, prefix, reaction }) => {
    // React to the message with a loudspeaker emoji
    await reaction(m.chat, "📢");

    // Retrieve user data from global database
    const user = global.db.users[m.sender];

    // Main greeting text
    const text = `*PEACE BE UPON YOU AND ALLAH'S MERCY AND BLESSINGS*

${pushName}🍁 I am an automated assistant designed to help you with information and answers you are looking for. Feel free to ask questions or request assistance from me.

*Bot Status:*
*[ ⌬ ] runtime:* ${runtime(process.uptime())}
*[ ⌬ ] role:* ${user.role}
*[ ⌬ ] total commands used:* ${user.command}

Please choose a menu option from the WhatsApp buttons to get started. I will provide the best services our bot can offer.
`;

    // Menu options
    const menuOptions = [
        {
            title: "Check Bot Uptime",
            description: "Display the bot's uptime",
            id: ".runtime"
        },
        {
            title: "Owner",
            description: "Show the bot owner's contact",
            id: ".owner"
        }
    ];

    // If the bot is using relay-style menu
    if (global.menuStyle === 'relay') {
        const relayButtons = [
            {
                name: "single_select",
                buttonParamsJson: JSON.stringify({
                    title: "Assistant",
                    sections: [
                        {
                            title: "Bot Menu",
                            highlight_label: "OPTIONS",
                            rows: menuOptions
                        }
                    ],
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "Just call🕊️",
                    url: "https://"
                })
            }
        ];
        await conn.sendButtonRelay(m.chat, text, relayButtons, m);

    // If the bot is using simple button menu
    } else if (global.menuStyle === 'button') {
        const imageUrl = 'https://files.catbox.moe/6fk98a.jpg';
        const simpleButtons = menuOptions;
        await conn.sendButton(m.chat, text, global.namebotz, "Please Select a Menu", imageUrl, null, simpleButtons, m);
    }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ["menu"];
handler.limit = 1;

export default handler;