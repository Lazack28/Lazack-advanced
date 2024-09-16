
const fs = require('fs');
const chalk = require('chalk');

//owmner v card
global.ytname = "YT: Lazaromtaju" //ur yt chanel name
global.socialm = "GitHub: Lazack28" //ur github or insta name
global.location = "Tanzania, Dodoma, Kikuyu" //ur location

//new
global.botname = '𝙻𝙰𝚉𝙰𝙲𝙺 𝙰𝙳𝚅𝙰𝙽𝙲𝙴 𝟶𝟶𝟹' //ur bot name
global.ownernumber = ['255734980103'] //ur owner number, dont add more than one
global.ownername = '𝙻𝙰𝚉𝙰𝙲𝙺' //ur owner name
global.websitex = "https://youtu.be/@lazaromtaju"
global.wagc = "https://whatsapp.com/channel/0029VaFytPbAojYm7RIs6l1x"
global.themeemoji = '🪀'
global.wm = "Lazack."
global.botscript = 'https://github.com/Lazack28/Lazack-Advanced' //script link
global.packname = "Sticker By"
global.author = "Lazack\n\n+255734980103"
global.creator = "255734980103@s.whatsapp.net"
global.xprefix = '.'
global.premium = ["255734980103"] // Premium User

//channel id
global.xchannel = {
	jid: '0363220399229536@newsletter'
	}

//bot sett
global.typemenu = 'v12' // menu type 'v1' => 'v12'
global.typereply = 'v4' // reply type 'v1' => 'v4'
global.autoblocknumber = '91' //set autoblock country code
global.antiforeignnumber = '91' //set anti foreign number country code

global.listv = ['🌹','●','■','✿','▲','➩','🪄','➣','➤','✦','✧','☀️','❀','○','□','❄️','♡','💫','♧','々','〆']
global.tempatDB = 'database.json'

global.limit = {
	free: 10,
	premium: 50,
	vip: 'VIP'
}

global.uang = {
	free: 10000,
	premium: 1000000,
	vip: 10000000
}

global.mess = {
	error: 'Error!',
	nsfw: 'Nsfw is disabled in this group, Please tell the admin to enable',
	done: 'Done'
}

global.bot = {
	limit: 0,
	uang: 0
}

global.game = {
	suit: {},
	menfes: {},
	tictactoe: {},
	kuismath: {},
	tebakbom: {},
}

//~~~~~~~~~~~~~~~< PROCESS >~~~~~~~~~~~~~~~\\

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
