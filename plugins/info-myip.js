const axios = require('axios');

const handler = async (m, { conn, text, command, usedPrefix }) => { 
  try {
    const { data } = await axios.get(`http://ip-api.com/json/`);  
    return await m.reply(Func.jsonFormat(data));
  } catch (err) {
    console.log(err);
    return await m.reply(err);
  }
}
handler.help = handler.command = ['myip']; 
handler.tags = ['info']; 

module.exports = handler