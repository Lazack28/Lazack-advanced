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
global.author = "Lazack Bugs"
global.thumb = fs.readFileSync("./assets/background.png")
global.ThM = 'https://img86.pixhost.to/images/487/563032543_skyzopedia.jpg'

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})