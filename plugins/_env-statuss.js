export async function before(message, { conn, isAdmin, isBotAdmin }) {
    const isStatusBroadcast = message.key.remoteJid === 'status@broadcast';
    if (!isStatusBroadcast) return false;

    this.story = this.story ? this.story : [];
    const { mtype, text, sender } = message;
    const { jid: botJid } = conn.user;
    const senderJid = message.key.participant.split('@')[0];
    const chatData = global.db.data.chats[message.chat];

    if (mtype === 'audioMessage' || mtype === 'videoMessage') {
        const caption = `Status from ${senderJid}`;
        try {
            let mediaBuffer = await message.download();
            await this.sendFile(botJid, mediaBuffer, '', caption, message, false, { mentions: [message.sender] });
            this.story.push({ type: mtype, quoted: message, sender: message.sender, caption: caption, buffer: mediaBuffer });
        } catch (error) {
            console.log(error);
            await this.reply(botJid, caption, message, { mentions: [message.sender] });
        }
    } else if (mtype === 'imageMessage') {
        try {
            let imageBuffer = await message.download();
            await this.sendFile(botJid, imageBuffer, '', '', message, false, { mimetype: message.mimetype });
            this.story.push({ type: mtype, quoted: message, sender: message.sender, buffer: imageBuffer });
        } catch (error) {
            console.log(error);
        }
    } else if (mtype === 'extendedTextMessage') {
        const replyText = text ? text : '';
        await this.reply(botJid, replyText, message, { mentions: [sender] });
        this.story.push({ type: mtype, quoted: message, sender: message.sender, message: replyText });
    }

    if (chatData) return true;
      }
