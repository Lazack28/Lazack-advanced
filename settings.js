
const fs = require('fs');
const chalk = require('chalk');

//owmner v card
global.ytname = "" //ur yt chanel name
global.socialm = " //ur github or insta name
global.location = "Tanzania, Dodoma, Kikuyu" //ur location

//new
global.botname = 'the futur billionnaire' //ur bot name
global.ownernumber = ['50934251716'] //ur owner number, dont add more than one
global.ownername = 'ia ' //ur owner name
global.websitex = "https://youtu.be/@lazaromtaju"
global.wagc = "https://whatsapp.com/channel/0029VaFytPbAojYm7RIs6l1x"
global.themeemoji = '😫'
global.wm = "the futur billionnaire."
global.botscript = 'https://github.com/Lazack28/Lazack-Advanced' //script link
global.packname = "Sticker By"
global.author = "Lazack\n\n+34251716"
global.creator = "50934251716@s.whatsapp.net"
global.xprefix = '.'
global.premium = ["50934251716"] // Premium User

//channel id
global.xchannel = {
	jid: '0363220399229536@newsletter'
	}

//bot sett
global.typemenu = 'v12' // menu type 'v1' => 'v12'
global.typereply = 'v4' // reply type 'v1' => 'v4'
global.autoblocknumber = '92' //set autoblock country code
global.antiforeignnumber = '91' //set anti foreign number country code

global.listv = ['•','●','■','✿','▲','➩','➢','➣','➤','✦','✧','△','❀','○','□','♤','♡','◇','♧','々','〆']
global.tempatDB = 'database.json'

global.limit = {
	free: 100,
	premium: 999,
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
