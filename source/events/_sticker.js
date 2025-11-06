

import "../../settings/config.js";
import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs';
import {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
    addExif
} from './exif.js';

export async function makeStickerFromUrl(mediaUrl, sock, m, reply) {
    try {
        let buffer;
        if (mediaUrl.startsWith("data:")) {
            const base64Data = mediaUrl.split(",")[1];
            buffer = Buffer.from(base64Data, 'base64');
        } else {
            const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
            buffer = Buffer.from(response.data, "binary");
        }

        const webpBuffer = await sharp(buffer, { animated: true })
            .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .webp({ quality: 80 })
            .toBuffer();

        const stickerWithExif = await addExif(webpBuffer, global.namebotz, global.footer);

        await sock.sendMessage(m.chat, {
            sticker: stickerWithExif,
            contextInfo: {
                externalAdReply: {
                    title: global.namebotz,
                    body: global.nameown,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    thumbnailUrl: `https://files.catbox.moe/prewfa.jpg`,
                    sourceUrl: global.YouTube
                }
            }
        }, { quoted: m });

    } catch (error) {
        console.error("Error creating sticker:", error);
        reply('Gagal membuat stiker. Pastikan format media didukung (Gambar/GIF).');
    }
}