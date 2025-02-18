const chalk = require("chalk")
const fs = require("fs")

global.ownerNumber = ["255734980103@s.whatsapp.net"]
global.nomerOwner = "255734980103"
global.nomorOwner = ['255734980103']
global.namaDeveloper = "Lazack Bugs" // Do not change this
global.namaOwner = "Lazack Bugs"
global.namaBot = "Lazack Bugs"
global.versionBot = "15.5"
global.packname = "Lazack Bugs"
global.saluran = '120363321705798318@newsletter' // ID Saluran Kamu
global.author = "Lazack Bugs"
global.saluranName = 'LAZACK BOTS' 
global.thumb = fs.readFileSync("./assets/logo.png")
global.ThM = 'https://img86.pixhost.to/images/487/563032543_skyzopedia.jpg'

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})