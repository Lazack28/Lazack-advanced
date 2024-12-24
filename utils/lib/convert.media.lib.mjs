import { writeFileSync, readFileSync, createReadStream } from "fs"
import configs from "../../Setting/settings.mjs"
import ffmpegCommand from "fluent-ffmpeg"
import createExif from "node-webpmux"
import { exec } from "child_process"
import formData from "form-data"
import { fileTypeFromBuffer } from 'file-type'
import FormData from 'form-data'
import * as cheerio from 'cheerio'
import { join } from "path"
import axios from "axios"

/**
 * @param {String} name
 * @param {String} pack
 * @returns {Object} object to describe sticker pack
**/
let jsonPostData = (name, pack) => {
  return {
    "sticker-pack-id": "https://github.com/Lazack",
    "sticker-pack-name": pack,
    "sticker-pack-publisher": name,
     emojis: ["🙄"]
  };
};

let fn = {
  jpg: join(process.cwd(), ".tmp", `image-${new Date() * 1}.jpg`),
  vid: join(process.cwd(), ".tmp", `video-${new Date() * 1}.mp4`),
  webp: join(process.cwd(), ".tmp", `stiker-${new Date() * 1}.webp`),
  webp2: join(process.cwd(), ".tmp", `stiker-${new Date() * 1}_.webp`),
  png: join(process.cwd(), ".tmp", `png-${new Date() * 1}_.png`),
  gif: join(process.cwd(), ".tmp", `gif-${new Date() * 1}_.gif`),
  aud: join(process.cwd(), ".tmp", `mp3-${new Date() * 1}_.mp3`),
  aud2: join(process.cwd(), ".tmp", `mp3-${new Date() * 1}.mp3`)
};

/**
 * How to create watermark sticker using library node-webpmux
 * @param {Buffer} buffer type webp
 * @param {Object} pack author and pack sticker
 * @returns {Buffer} resolve buffer type webp
**/
function wmSticker(buffer, pack) {
  return new Promise(async (resolve, reject) => {
    await writeFileSync(fn.webp, buffer);
    let exif = new createExif.Image();
    let buff = Buffer.from([
      0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16,
      0x00, 0x00, 0x00
    ]);
    let dataExif = Buffer.from(JSON.stringify(jsonPostData(pack.name, pack.author)), "utf-8");
    let loadDataExif = Buffer.concat([buff, dataExif]);
    loadDataExif.writeUIntLE(dataExif.length, 14, 4);
    await exif.load(fn.webp);
    exif.exif = loadDataExif;
    await exif.save(fn.webp2);
    let readData = await readFileSync(fn.webp2);
    resolve(readData);
    configs.tmp(fn.webp);
    configs.tmp(fn.webp2);
  });
}

/**
 * Convert image to Sticker using Ffmpeg
 * @param {Buffer} buffer type jpg <write using fs>
 * @param {Object} pack stiker and author type object
 * @returns {Buffer} buffer type webp
**/
function imgToStiker(buffer, pack) {
  return new Promise(async (resolve, reject) => {
    await writeFileSync(fn.jpg, buffer);
    await ffmpegCommand(fn.jpg)
      .input(fn.jpg)
      .addOutputOptions([
        `-vcodec`,
        `libwebp`,
        `-vf`,
        `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
      ])
      .toFormat("webp")
      .save(fn.webp)
      .on("end", async () => {
        configs.tmp(fn.jpg);
        let b = await readFileSync(fn.webp);
        let wm = await wmSticker(b, pack);
        resolve(wm);
      })
      .on("error", (u) => {
        configs.tmp(fn.jpg);
        reject(u);
      });
  });
}

/**
 * How to convert mp4 to webp using ffmpeg
 * @param {Buffer} buffer type mp4 or mov
 * @param {Object} pack sticker and author with object
 * @returns {Buffer} wm type webp
**/
function vidToStiker(buffer, pack) {
  return new Promise(async (resolve, reject) => {
    await writeFileSync(fn.vid, buffer);
    await ffmpegCommand(fn.vid)
      .input(fn.vid)
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
        "-loop",
        "0",
        "-ss",
        "00:00:00",
        "-t",
        "00:00:10",
        "-preset",
        "default",
        "-an",
        "-vsync",
        "0"
      ])
      .toFormat("webp")
      .save(fn.webp)
      .on("end", async () => {
        let b = await readFileSync(fn.webp);
        let wm = await wmSticker(b, pack);
        resolve(wm);
        configs.tmp(fn.vid);
      })
      .on("error", (u) => {
        configs.tmp(fn.vid);
        reject(u);
      });
  });
}

/**
 * Convert Webp sticker to Image with ext .jpg
 * @param {Buffer} buffer type of webp
 * @returns {Buffer} buff return to image with ext .jpg
**/
function toJpg(buffer) {
  return new Promise(async (resolve, reject) => {
    await writeFileSync(fn.webp2, buffer);
    await exec(`ffmpeg -i ${fn.webp2} ${fn.png}`, async (err) => {
      configs.tmp(fn.webp2);
      if (err) throw reject(err);
      let buff = await readFileSync(fn.png);
      configs.tmp(fn.png);
      resolve(buff);
    });
  });
}

/**
 * Convert Webp to video using Ffmpeg and Imagemagick
 * @param {Buffer} buffer type webp sticker
 * @returns {Buffer} buff type Video with ext .mp4
 * Reference : https://kotakode.com/pertanyaan/6655/Bagaimana-cara-mengubah-animated-webp-ke-mp4-%3F-di-ffmpeg
 */
function toVid(buffer) {
  return new Promise(async (resolve, reject) => {
    await writeFileSync(fn.webp, buffer);
    await exec(`convert ${fn.webp} ${fn.gif}`, async (err) => {
      if (err) {
        configs.tmp(fn.webp);
        return reject(err);
      }
      await exec(
        `ffmpeg -i ${fn.gif} -pix_fmt yuv420p -c:v libx264 -movflags +faststart -filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2' ${fn.vid}`,
        async (err) => {
          if (err) {
            configs.tmp(fn.webp);
            configs.tmp(fn.gif);
            return reject(err);
          }
          let buff = await readFileSync(fn.vid);
          resolve(buff);
          configs.tmp(fn.webp);
          configs.tmp(fn.gif);
          configs.tmp(fn.vid);
        }
      );
    });
  });
}

/**
 * Convert Webp to video using post method to https://s6.ezgif.com/webp-to-mp4
 * Source : https://s6.ezgif.com/webp-to-mp4
 * @param {Buffer} buffer type webp sticker
 * @returns {Buffer} result type Video with ext .mp4
 * Coded by : mrhtz
**/
function toVid2(buffer) {
  return new Promise(async (resolve, reject) => {
    await writeFileSync(fn.webp, buffer);
    const form = new formData();
    form.append("new-image-url", "");
    form.append("new-image", createReadStream(fn.webp));
    axios({
      method: "post",
      url: "https://s6.ezgif.com/webp-to-mp4",
      data: form,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`
      }
    })
      .then(({ data }) => {
        const form2 = new formData();
        const $ = cheerio.load(data);
        const file = $('input[name="file"]').attr("value");
        form2.append("file", file);
        form2.append("convert", "Convert WebP to MP4!");
        axios({
          method: "post",
          url: "https://ezgif.com/webp-to-mp4/" + file,
          data: form2,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${form2._boundary}`
          }
        })
          .then(({ data }) => {
            const $ = cheerio.load(data);
            const result = "https:" + $("div#output > p.outfile > video > source").attr("src");
            resolve(result);
            configs.tmp(fn.webp);
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
}

/**
 * Convert Video to Audio using ffmpeg
 * @param {Buffer} buffer type Video ext .mp4
 * @returns {Buffer} buff type Audio ext .mp3
**/
function toMp3(buffer) {
  return new Promise(async (resolve, reject) => {
    await writeFileSync(fn.vid, buffer);
    await ffmpegCommand(fn.vid)
      .output(fn.aud)
      .on("end", async () => {
        let buff = await readFileSync(fn.aud);
        resolve(buff);
        configs.tmp(fn.vid);
        configs.tmp(fn.aud);
      })
      .on("error", (err) => reject(err))
      .run();
  });
}

/**
 * @param {Buffer} buffer buffer type audio ext .opus | .mp3
 * @param {String} type type to describe what are you convert
 * @returns {Buffer} buffer audio form convert ffmpeg
**/
function effectAudio(buffer, type) {
  return new Promise(async (resolve, reject) => {
    let effect = ["bass", "blown", "deep", "earrape", "fast", "fat", "nightcore", "reverse", "slow", "smooth", "tupai"];
    if (!effect.includes(type)) return reject("Maaf!!!, type nya tidak tersedia disini");
    let hasil;
    switch (type) {
      case effect[0]:
        {
          hasil = "-af equalizer=f=54:width_type=o:width=2:g=20";
        }
        break;
      case effect[1]:
        {
          hasil = "-af acrusher=.1:1:64:0:log";
        }
        break;
      case effect[2]:
        {
          hasil = "-af atempo=4/4,asetrate=44500*2/3";
        }
        break;
      case effect[3]:
        {
          hasil = "-af volume=12";
        }
        break;
      case effect[4]:
        {
          hasil = '-filter:a "atempo=1.63,asetrate=44100"';
        }
        break;
      case effect[5]:
        {
          hasil = '-filter:a "atempo=1.6,asetrate=22100"';
        }
        break;
      case effect[6]:
        {
          hasil = "-filter:a atempo=1.06,asetrate=44100*1.25";
        }
        break;
      case effect[7]:
        {
          hasil = '-filter_complex "areverse"';
        }
        break;
      case effect[8]:
        {
          hasil = '-filter:a "atempo=0.7,asetrate=44100"';
        }
        break;
      case effect[9]:
        {
          hasil = "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
        }
        break;
      case effect[10]:
        {
          hasil = '-filter:a "atempo=0.5,asetrate=65100"';
        }
        break;
    }
    await writeFileSync(fn.aud, buffer);
    exec(`ffmpeg -i ${fn.aud} ${hasil} ${fn.aud2}`, async (err) => {
      configs.tmp(fn.aud);
      if (err) return reject(err);
      let buff = readFileSync(fn.aud2);
      await resolve(buff);
      configs.tmp(fn.aud2);
    });
  });
}

export { 
  fn, 
  toJpg, 
  toVid, 
  toVid2, 
  wmSticker, 
  imgToStiker, 
  vidToStiker, 
  effectAudio 
};