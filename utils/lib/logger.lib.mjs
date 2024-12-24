import lolcat from 'lolcatjs';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
lolcat.options.seed = Math.round(Math.random() * 1000);
lolcat.options.colors = true;

// Jika anda tidak suka dengan template bawaan anda bisa memakai template anda sendiri
let garis = [
  "╔⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╗",
  "╚⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤╝",
  "•❅───✧",
  "✧───❅•" /** Kiri kanan **/ 
];

let awalan = ["•≫", "シ", "જ", "✾", "✼", "˚❀"];

let teks = [
  "Command:",
  "Pesan:",
  "Oleh:",
  "Di Chat:",
  "Waktu:",
  "Di Private Chat",
  "" // INI JIKA DI ISI BAKAL MUNCUL NAMA KAMU
];

// READ TO CONSOLE
const loggerMessage = async (m, { conn, q, up, budy, meta }) => {
  let p = q.rdm(awalan);
  if (m.fromMe) return;
  if (m.chat == "status@broadcast") return;
  if (!m.isBaileys && !up.messageStubType) {
    lolcat.fromString(budy.startsWith(m.preff) ? `${p} ${teks[0]} ${q.cut(budy, 400)}` : `${p} ${teks[1]} ${q.cut(budy, 400) || m.mtype}`);
    lolcat.fromString(`${p} ${teks[2]} ` + m.sender.split("@")[0]);
    lolcat.fromString(m.isGc ? `${p} ${teks[3]} ${meta.subject}` : `${p} ${teks[5]}`);
    lolcat.fromString(`${p} ${teks[4]} ` + new Date().toDateString() + "\n");
  } else if (m.isBaileys && !up.messageStubType) {
    lolcat.fromString(`${p} ${teks[1]} Tidak diketahui`);
    lolcat.fromString(`${p} ${teks[2]} BOT LAIN`);
    lolcat.fromString(m.isGc ? `${p} ${teks[3]} ${meta.subject}` : `${p} ${teks[5]}`);
    lolcat.fromString(`${p} ${teks[4]} ` + new Date().toDateString() + "\n");
  } else if (!m.isBaileys && up.messageStubType) {
    lolcat.fromString(garis[0]);
    lolcat.fromString(`  ${garis[2]} Notification Update Group ${garis[3]}`);
    lolcat.fromString(m.isGc ? `${p} ${teks[3]} ${meta.subject}` : `${p} ${teks[5]}`);
    lolcat.fromString(`${p} ${teks[4]} ` + new Date().toDateString());
    lolcat.fromString(garis[1]);
  }
};

export const _ = {
  wait: () => chalkAnimation.rainbow("Menunggu tersambung ke koneksi server..."),
  p: () =>
    figlet.textSync(teks[6].length < 1 ? "Airi miyu" : teks[6], {
      font: "Crawford",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 60,
      whitespaceBreak: true
    })
};

export default loggerMessage;