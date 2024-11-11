const os = require('os');
const { performance } = require('perf_hooks');
const { exec } = require('child_process');

var handler = async (message, { conn }) => {
    const startTime = performance.now();
    
    exec('neofetch --stdout', (error, stdout, stderr) => {
        const memoryInfo = stdout.replace(/Memory:/, '');
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Convert to MB
        const totalMemory = Math.round(os.totalmem() / 1024 / 1024); // Convert to MB
        
        const response = `
            *OS*: ${os.platform()}
            *Hostname*: ${os.hostname()}
            *Memory Used*: ${memoryUsage} MB
            *Total Memory*: ${totalMemory} MB
            *Response Time*: ${(performance.now() - startTime).toFixed(2)} ms
        `;
        
        message.reply(response);
    });
};

handler.help = ['ping'];
handler.tags = ['misc'];
handler.command = ['ping'];

module.exports = handler;