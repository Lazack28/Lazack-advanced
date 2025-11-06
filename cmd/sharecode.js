let handler = async (m, { conn, text, args, prefix }) => {
    // List of newsletter channels to send to
    const newsletterList = [
        "120363421657033758@newsletter"
    ];

    // Combine text and args into one input string
    const input = (text && text.trim()) || args.join(' ').trim();

    // Check if input is valid and contains "|"
    if (!input || !input.includes("|")) {
        return conn.sendMessage(m.chat, {
            text: 'Invalid format! Use the format:\n\n*.sharecode IMAGE_URL|TARGET_URL|BUTTON_TEXT*'
        }, { quoted: m });
    }

    // Split input into parts
    const parts = input.split("|").map(x => x.trim());
    if (parts.length < 3 || parts.some(x => !x)) {
        return conn.sendMessage(m.chat, {
            text: `${prefix}sharecode image-url|link|button-text`
        }, { quoted: m });
    }

    const [imageUrl, targetUrl, buttonText] = parts;

    const titleText = "> UPDATE INFORMATION \n> CLICK BUTTON\n";
    const footerText = "Created by: fauzialifatah";

    // React with "loading" emoji
    await conn.sendMessage(m.chat, { react: { text: '🔄', key: m.key } });

    try {
        // Build the interactive message
        const interactiveMessage = {
            interactiveMessage: {
                title: titleText,
                footer: footerText,
                image: { url: imageUrl },
                buttons: [
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: buttonText,
                            url: targetUrl
                        })
                    },
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Channel🎉",
                            url: `https://whatsapp.com/channel/0029Vb6j2u74NViqgNCLev3a`
                        })
                    }
                ]
            }
        };

        // Send the interactive message to each newsletter channel
        for (const id of newsletterList) {
            await conn.sendMessage(id, interactiveMessage);
            console.log(`✅ Sent to: ${id}`);
            await new Promise(res => setTimeout(res, 1500)); // small delay between messages
        }

        // React with success
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
        await conn.sendMessage(m.chat, {
            text: `✅ Successfully sent message to ${newsletterList.length} channel(s):\n${newsletterList.join("\n")}`
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(m.chat, {
            text: `❌ An error occurred while sending to channels: ${e.message}`
        });
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

handler.help = ['sharecode <image_url>|<target_url>|<button_text>'];
handler.tags = ['owner'];
handler.command = ["sharecode"];

export default handler;