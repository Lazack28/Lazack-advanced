const chalk = require("chalk")
const fs = require("fs")

global.ownerNumber = ["243895984998@s.whatsapp.net"]
global.nomerOwner = "256727043859"
global.nomorOwner = ['243895984998']
global.namaDeveloper = "Arjay Bugs" // Do not change this
global.namaOwner = "Arjay Bugs"
global.namaBot = Arjay Bugs"
global.versionBot = "15.5"
global.packname = "Arjay Bugs"
global.saluran = '120363321705798318@newsletter' // ID Saluran Kamu
global.author = "Arjay Bugs"
global.saluranName = 'ARJAY BOTS' 
global.thumb = fs.readFileSync("./assets/logo.png")
global.ThM = 'https://img86.pixhost.to/images/487/563032543_skyzopedia.jpg'

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
