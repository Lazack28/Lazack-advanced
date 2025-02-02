const fs = require('fs')

global.d = new Date()
global.calender = d.toLocaleDateString('id')

    //General Settings 
global.prefa = ['','!','.',',','🐤','🗿']
global.ownNumb = '' //ganti aj klo mau
global.NamaOwner = 'lazack28' //gausah diganti 
global.sessionName = 'Session'
global.namabot = 'Fauzialifatah - md' //ganti aj klo mau
global.author = 'lazack28' //ganti aj klo mau
global.packname = 'fauzialifatah - md' //ganti aj klo mau
global.yt = '' //gausah diganti 

global.mess = { // bagian ini gausah diganti 
    ingroup: 'Gabisa lah kocak, Fitur ini khusus untuk group💢',
    owner: 'Waduhh! ,Lu bukan owner gw bg🗣️',
    premium: 'You are not a premium user, Lu gabisa akses fitur ini karna lu bukn preium, aowkawokawok🐦',
    seller: 'Lu bukan seller, Jadi gabakal bisa make😹',
    usingsetpp: 'Setpp hanya bisa dipake owner, lu kira gw bego? 🤓',
    wait: 'Tunggu sedang diproses🕙'
}

global.autOwn = 'req(62-8S57547ms11).287p'
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
	require('fs').unwatchFile(file)
	console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
	delete require.cache[file]
	require(file)
})