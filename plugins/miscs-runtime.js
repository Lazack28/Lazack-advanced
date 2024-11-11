module.exports = {
    run: async (message, { conn, Func }) => {
        let uptime = process.uptime() * 1000; // Get uptime in milliseconds
        let formattedUptime = Func.toTime(uptime); // Convert uptime to a human-readable format
        conn.reply(message.id, Func.texted('bold', 'Lazack Running for: [' + formattedUptime + ']'), message);
    },
    help: ['runtime'],
    tags: ['miscs'],
    command: /^(runtime|run)$/i
};