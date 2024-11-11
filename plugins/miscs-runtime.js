module.exports = {
    run: async (message, { conn, Func }) => {
        try {
            let uptime = process.uptime() * 1000; // Get uptime in milliseconds
            let formattedUptime = Func.toTime(uptime); // Convert uptime to a human-readable format
            
            // Get current memory usage
            let memoryUsage = process.memoryUsage();
            let memoryInfo = `Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB, Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`;

            // Get current date and time
            let currentTime = new Date().toLocaleString();

            // Construct the reply message
            let replyMessage = `Lazack Running for: [${formattedUptime}]\nMemory Usage: ${memoryInfo}\nCurrent Time: ${currentTime}`;

            // Send the reply
            conn.reply(message.id, Func.texted('bold', replyMessage), message);
        } catch (error) {
            console.error("Error in runtime command:", error);
            conn.reply(message.id, "An error occurred while retrieving the runtime information.", message);
        }
    },
    help: ['runtime'],
    tags: ['miscs'],
    command: /^(runtime|run)$/i
};