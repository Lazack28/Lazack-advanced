const os = require('os');
const { performance } = require('perf_hooks');
const { spawn, exec, execSync } = require('child_process');

var handler = async (m, { conn }) => {
  const timestamp = performance.now();
  const latensi = performance.now() - timestamp;
  exec(`neofetch --stdout`, (error, stdout, stderr) => {
    const child = stdout.toString('utf-8');
    const anakkecik = child.replace(/Memory:/, 'Ram:');
    m.reply(`${anakkecik}*-* *Kecepatan Respon* : ${latensi.toFixed(4)} _ms_\n*-* *Memory* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem / 1024 / 1024)}MB\n*-* *OS* : ${os.version()}\n*-* *Platform* : ${os.platform()}\n*-* *Hostname* : ${os.hostname()}`);
  });
};
handler.help = ['ping'];
handler.tags = ['misc'];
handler.command = ['ping', 'speed'];

module.exports = handler;