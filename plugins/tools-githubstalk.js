const axios = require('axios');
const moment = require('moment-timezone');

const handler = async (m, { text, usedPrefix, command, Func }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, 'Im-Dims'));
  m.react("🕒");
  let tek = text.replace("https://github.com/", "").replace("@", "");
  axios.get(`https://api.github.com/users/${tek}`).then((res) => {
    let { login, type, name, followers, following, created_at, updated_at, public_gists, public_repos, twitter_username, bio, hireable, email, location, blog, company, avatar_url, html_url } = res.data;
    let caption = `乂  *G I T H U B - S T A L K*\n\n`
    caption += `  ◦  *User Name* : ${login}\n`
    caption += `  ◦  *Nick Name* : ${name}\n`
    caption += `  ◦  *Followers* : ${followers}\n`
    caption += `  ◦  *Following* : ${following}\n`
    caption += `  ◦  *Public Gists* : ${public_gists}\n`
    caption += `  ◦  *Public Repos* : ${public_repos}\n`
    caption += `  ◦  *Twitter* : ${twitter_username == null ? '-' : twitter_username}\n`
    caption += `  ◦  *Email* : ${email == null ? '-' : email}\n`
    caption += `  ◦  *Location* : ${location == null ? '-' : location}\n\n`
    caption += `  ◦  *Blog* : ${blog}\n`
    caption += `  *-*  *Link* : ${html_url}\n\n`
    caption += `  ◦  *Created Time* :\n`
    caption += `  *-*  *Date* : ${moment(created_at).tz('Asia/Jakarta').format('DD-MM-YYYY')}\n`
    caption += `  *-*  *Time* : ${moment(created_at).tz('Asia/Jakarta').format('HH:mm:ss')}\n\n`
    caption += `  ◦  *Updated Time* :\n`
    caption += `  *-*  *Date* : ${moment(updated_at).tz('Asia/Jakarta').format('DD-MM-YYYY')}\n`
    caption += `  *-*  *Time* : ${moment(updated_at).tz('Asia/Jakarta').format('HH:mm:ss')}\n\n`
    caption += `  ◦  *Bio* : ${bio}\n\n`
    caption += global.footer 
    conn.sendFile(m.chat, avatar_url, 'github-stalk.png', caption, m);
  });   
}
handler.help = ['githubstalk'];
handler.tags = ['internet'];
handler.command = /^(githubstalk)$/i;
handler.limit = true;

module.exports = handler;