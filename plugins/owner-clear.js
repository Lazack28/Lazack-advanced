const os = require("os");
const path = require("path");
const fs = require("fs");

const handler = async (m, { conn }) => {
  m.reply(`Sukses Membersihkan *tmp + sessions*`);
  m.react("✅");

  // Membersihkan direktori tmp
  const tmpDirs = [os.tmpdir(), path.join("./", "tmp")];
  tmpDirs.forEach((dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    });
  });

  // Membersihkan direktori sessions kecuali creds.json
  const sessionsDir = path.join("./", "session");
  fs.readdirSync(sessionsDir).forEach((file) => {
    if (file !== "creds.json") {
      const filePath = path.join(sessionsDir, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      }
    }
  });
};
handler.help = handler.command = ["clear"];
handler.tags = ["owner"];
handler.rowner = true;

module.exports = handler;