export default {
  name: "Airi lazack", // bot name
  ownername: "Lazack28",
  dev: ["255734980103"],
  developer: JSON.parse(fs.readFileSync("./Setting/owner.json")) ?? ["255734980103"], // Check in owner.json
  moderator: JSON.parse(fs.readFileSync("./Setting/mod.json")) ?? [], // Check in mods.json
  prems: JSON.parse(fs.readFileSync("./Setting/prems.json")) ?? ["255734980103"], // Check in prems.json

  // connection
  browser: ["Ubuntu", "Firefox", "20.0.04"],
  longqr: 50000, // duration of QR code
  namedb: "database", // database name 
  session: "session", // session folder name [ This will be a folder, not a file ]

  // thumbnail 
  thumb: "https://home.lazackorganisation.my.id/img/img1.jpg",
  thumb2: "https://home.lazackorganisation.my.id/img/img1.jpg",
  video: "https://pomf2.lain.la/f/xh7hfiqt.mp4",
  
  // bot settings
  header: "Lazack-advanced V1.3.0",
  footer: "Lightweight bot by Lazack",
  
  // functions
  Func: new Function(),
  
  // links
  linkch: "https://whatsapp.com/channel/0029VaDs0ba1SWtAQnMvZb0U",
  
  // group IDs
  gcbot: ["120363028160234241@g.us"],

  // GitHub
  emailgh: "ipungrasta995@gmail.com",
  usernamegh: "Lazack",
  home: "https://github.com/Lazack28/Lazack-advanced#readme",
  bug: "https://github.com/Lazack28/Lazack-advanced/issues",

  // options
  timeoutgame: 50000, // Game timeout
  sensitive: 0.75, // Command sensitivity
  longbc: 7000, // Long BC is a broadcast protection against bans
  
  // FAIL MESSAGES
  // CHANGE THIS ACCORDING TO NEEDS [IF POSSIBLE, ADD MORE]
  connect: "Bot has connected to the WhatsApp Web server",
  sukses: "Success, Kak :)",
  gagal: "Failed :(, Please repeat the command\nIf this is an error, please report to the owner",
  owner: "This feature is for my owner only",
  prem: "This feature is for premium users only, Kak",
  moderr: "This feature is for my moderators only",
  forgc: "This feature is for group",
  forpc: "This feature is for private chat",
  leave: "Hi Kak, I was ordered by my owner to leave this group :)\nI'm sorry if I have many mistakes :)\nSayonara >,<",
  forimg: "Send a photo then type the command caption or send a photo first then reply to the photo with the command",
  forteks: "Reply or tag a member or type the member's number after the command",
  teks: "Reply to the text / Enter characters after the command",
  admin: "You are not important_-\nOnly for Admin",
  botadmin: "I'm not an admin T_T\nPlease make me an admin first",
  active: "I was already active before :v",
  unactive: "I was already inactive before :v",
  aslink: "Enter the link after the command",
  query: "Enter the query or keyword after the command",
  flink: "The link you entered is not valid",
  gcouttime: "Hi Kak, this active period has expired, I will leave automatically",
  linkadm: "Group admin does not allow group links to be shared :)",
  notext: "Where is the text?",
  wait: "Processing...",
  ok: "Okay, darling",
  
  // DEFAULT WELCOME SETTING
  // @sub @user @admin @jmlh
  joingc: "Hi Kak, I am lazack\nI entered here at the command of my owner :)\nI will leave this group if my owner commands me to leave\nPlease use my features as best as possible :)",
  fsub: "@admin has changed the group subject to @sub",
  fppgc: "@admin has changed the group profile photo",
  fbgc: "@admin has opened this group, members can now send messages to this group",
  ftgc: "@admin has closed this group, members can no longer send messages to this group",
  fbinp: "@admin has changed the settings of this group, members can now edit this group's info",
  ftinp: "@admin has changed the settings of this group, members can no longer edit this group's info",
  fpm: "@admin has promoted @user to admin in this group",
  fdm: "@admin has demoted @user to a regular member",
  faddadmin: "@admin has added @user to this group\nSay hello to the new group member",
  faddlink: "@user has joined this group using the link\nSay hello to the new group member :)",
  faddinv: "@user has joined the group using my invitation",
  fout: "@user has left this group :(",
  fkick: "@admin has kicked @user out of this group :v\nOh no, a burden has left the group",
  fephe: "@admin has set a temporary message in this group @jmlh",
  fofephe: "@admin has turned off temporary messages in this group",
  fownerjoin: "My owner has joined using the link\nGive them a warm welcome :)",

  // Aesthetic
  tit: (text) => "*------: " + text + " :------*",
  cmd: (text) => "  • " + text,
  sub: (text) => "  *< " + text + " />*",
  a4: "╔══ஓ ๑ ♡ ๑ ஓ══╗",
  a5: "╚══ஓ ๑ ♡ ๑ ஓ══╝",
  a6: "*----:--:-{23}-:--:----*",

  // avoid typing @s.wangsaf or @g.us
  // Do not change this part
  idwa: "@s.whatsapp.net",
  idgc: "@g.us",
  idst: "status@broadcast",

  // This is a function [Do not change it :) ]
  /**
   *
   * @param {Number} ms date type number
   * @returns {Promise} promised setTimeout
   *
  **/
  delay: async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  },
  
  /**
   * @param {Number} nominal nominal for money
   * @returns {String} string money with commas
   *
  **/
  
  rb: (nominal) => {
    var numb = nominal.toString()
    var sisa = numb.length % 3
    var rupe = numb.substr(0, sisa)
    var ribu = numb.substr(sisa).match(/\d{3}/g)
    let heh
    if (ribu) heh = sisa ? "," : ""
    rupe += heh + ribu.join(",")
    return rupe
  },
  
  /**
   *
   * @param {String} url url from the internet
   * @returns {Boolean} true / false type url?
  **/
  url: (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, "gi"))
  },
  
  /**
   * Random value
   * @param {Array} array array to random value
   * @returns value
  **/
  rdm: (array) => {
    return array[Math.floor(Math.random() * array.length)]
  },
  
  /**
   * cutting text
   * @param {String} text text/value to be cut
   * @param {Number} length length of text to cut
   * @returns value
  **/
  cut: (text, length) => (text.length > length ? `${text.substr(0, length)}\n<More${text.length - length} Characters>` : text),
  
  /**
   * Time string with modern digital time
   * @param {Number} times new date difference
   * @returns string time
  **/
  time: (times) => {
    const seconds = Math.floor((times / 1000) % 60),
      minutes = Math.floor((times / (60 * 1000)) % 60),
      hours = Math.floor((times / (60 * 60 * 1000)) % 24),
      days = Math.floor(times / (24 * 60 * 60 * 1000))
    return (
      (days ? `${days} Days ` : "") +
      (hours ? `${hours} Hours ` : "") +
      (minutes ? `${minutes} Minutes ` : "") +
      (seconds ? `${seconds} Seconds` : "")
    ).trim()
  },
  
  /**
   * rename file to .tmp
   * @param {String} fileWithPath Path/ location of the file to be renamed
   * @returns
  **/
  tmp: async (fileWithPath) => await fs.renameSync(fileWithPath, fileWithPath + ".tmp"),
  
  /**
   * get buffer from url using axios
   * @param {String} url url to get buffer
   * @returns
  **/
  getbuff: async (url) => {
    const res = await axios({
      method: "get",
      url,
      headers: { 
        DNT: 1, "Upgrade-Insecure-Request": 1 
      },
      responseType: "arraybuffer"
    })
    return res.data
  }
}

global.axios = axios 
global.fetch = fetch
global.cheerio = cheerio
global.fs = fs

global.APIs = {
  ssa: 'https://api.ssateam.my.id',
  xyro: 'https://api.xyro.tech'
}

global.APIKeys = {
  'https://api.ssateam.my.id': '',
  'https://api.xyro.tech': ''
}

global.key = {
  groq: ''
}

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { 
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() 
}; 

global.__dirname = function dirname(pathURL) { 
  return path.dirname(global.__filename(pathURL, true)) 
}; 

global.__require = function require(dir = import.meta.url) { 
  return createRequire(dir) 
}