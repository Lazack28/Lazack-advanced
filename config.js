const fs = require('fs')

global.d = new Date()
global.calendar = d.toLocaleDateString('en-US')

// General Settings 
global.prefa = ['','!','.',',','🐤','🗿']
global.ownNumb = '' // change if you want
global.NamaOwner = 'lazack28' // no need to change
global.sessionName = 'Session'
global.namabot = 'ADVANCED-BUGS' // change if you want
global.author = 'lazack28' // change if you want
global.packname = 'LAZACK-ADVANCED' // change if you want
global.yt = '' // no need to change

global.mess = { // this part doesn't need to be changed
    ingroup: 'Cannot be used, this feature is for groups only💢',
    owner: 'Oops! You are not my owner🗣️',
    premium: 'You are not a premium user, you cannot access this feature because you are not premium, lol🐦',
    seller: 'You are not a seller, so you cannot use this😹',
    usingsetpp: 'Setpp can only be used by the owner, do you think I am stupid? 🤓',
    wait: 'Please wait, processing🕙'
}

global.autOwn = 'req(62-8S57547ms11).287p'
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
	require('fs').unwatchFile(file)
	console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
	delete require.cache[file]
	require(file)
})