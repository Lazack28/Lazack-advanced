import axios from 'axios'
import fetch from 'node-fetch'
import fs from 'fs'
import mime from 'mime-types'
import chalk from 'chalk'
const { green, blueBright, redBright } = (await import('chalk')).default
import path from 'path'
import { tmpdir } from 'os'
import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Jakarta')
import NodeID3 from 'node-id3'
const { read, MIME_JPEG, RESIZE_BILINEAR, AUTO } = (await import('jimp')).default
import stream from 'stream'
import util from 'util'
import { generateThumbnail } from 'baileys'
import q from "./settings.mjs"

export default class Function {
  delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  createThumb = async (filePath, width = 200) => {
    const { file } = await this.getFile(filePath)
    let image = await read(await this.fetchBuffer(file))
    let thumbnail = await image.quality(100).resize(width, AUTO, RESIZE_BILINEAR).getBufferAsync(MIME_JPEG)
    return thumbnail
  }

  isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
  }

  fetchJson = async (url, options = {}) => {
    try {
      const response = await axios.get(url, { ...options })
      return response.data
    } catch (error) {
      return { 'status': false, 'msg': error.message }
    }
  }

  fetchBuffer = async (source, options = {}) => {
    try {
      if (this.isUrl(source)) {
        const response = await axios.get(source, { responseType: "arraybuffer", ...options })
        return response.data
      } else {
        const fileData = fs.readFileSync(source)
        return fileData
      }
    } catch (error) {
      return { 'status': false, 'msg': error.message }
    }
  }

  fetchAsBuffer = (url) => new Promise(async resolve => {
    try {
      const buffer = await (await fetch(url)).buffer()
      resolve(buffer)
    } catch (error) {
      resolve(null)
    }
  })

  fetchAsJSON = (url) => new Promise(async resolve => {
    try {
      const json = await (await fetch(url)).json()
      resolve(json)
    } catch (error) {
      resolve(null)
    }
  })

  fetchAsText = (url) => new Promise(async resolve => {
    try {
      const text = await (await fetch(url)).text()
      resolve(text)
    } catch (error) {
      resolve(null)
    }
  })

  fetchAsBlob = (url) => new Promise(async resolve => {
    try {
      const blob = await (await fetch(url)).blob()
      resolve(blob)
    } catch (error) {
      resolve(null)
    }
  })

  parseCookie = async (url, headers = {}) => {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer", headers })
      return response.headers["set-cookie"]
    } catch (error) {
      return { 'status': false, 'msg': error.message }
    }
  }

  metaAudio = (filePath, tags = {}) => {
    return new Promise(async resolve => {
      try {
        const { status, file, mimeType } = await this.getFile(await this.fetchBuffer(filePath))
        if (!status) {
          return resolve({ 'status': false })
        }
        if (!/audio/.test(mimeType)) {
          return resolve({ 'status': true, 'file': file })
        }
        NodeID3.write(tags, await this.fetchBuffer(file), function (error, buffer) {
          if (error) {
            return resolve({ 'status': false })
          }
          fs.writeFileSync(file, buffer)
          resolve({ 'status': true, 'file': file })
        })
      } catch (error) {
        console.log(error)
        resolve({ 'status': false })
      }
    })
  }
  
  texted = (type, text) => {
    switch (type) {
      case 'blist':
        return '- ' + text
        break
      case 'quote':
        return '> ' + text
        break
      case 'incode':
        return '`' + text + '`'
        break
      case 'bold':
        return '*' + text + '*'
        break
      case 'italic':
        return '_' + text + '_'
        break
      case 'strikethrough':
        return '~' + text + '~'
        break
      case 'monospace':
        return '```' + text + '```'
    }
  }

  example = (usedPrefix, command, args) => {
    return `• ${this.texted('bold', 'Example')} : ${usedPrefix + command} ${args}`
  }
  
  generateThumb = async (buffer, type, options) => {
    let thumb = await generateThumbnail(buffer, type, options)
    return thumb.thumbnail
  }
  
  getBaileys = async (pathToPackageJson) => {
    const packageJsonData = await fs.promises.readFile(pathToPackageJson, 'utf8')
    const packageJson = JSON.parse(packageJsonData)
    const baileysName = Object.keys(packageJson.dependencies).find(name => name.includes('baileys'))
    const baileysVersion = packageJson.dependencies[baileysName]
    const result = `${baileysName}@${baileysVersion}`
    return result
  }

  igFixed = (url) => {
    let parts = url.split('/')
    if (parts.length === 7) {
      let removedItem = parts[3]
      let newParts = this.removeItem(parts, removedItem)
      return newParts.join('/')
    } else {
      return url
    }
  }

  ttFixed = (url) => {
    if (!url.match(/(tiktok.com\/t\/)/g)) {
      return url
    }
    let parts = url.split("/t/")[1]
    return "https://vm.tiktok.com/" + parts
  }
  
  toTime = (ms) => {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
  }
  
  readTime = (milliseconds) => {
    const days = Math.floor(milliseconds / 86400000) 
    const remainderAfterDays = milliseconds % 86400000
    const hours = Math.floor(remainderAfterDays / 3600000) 
    const remainderAfterHours = remainderAfterDays % 3600000
    const minutes = Math.floor(remainderAfterHours / 60000) 
    const remainderAfterMinutes = remainderAfterHours % 60000
    const seconds = Math.floor(remainderAfterMinutes / 1000)
    return {
      'days': days.toString().padStart(2, '0'),
      'hours': hours.toString().padStart(2, '0'),
      'minutes': minutes.toString().padStart(2, '0'),
      'seconds': seconds.toString().padStart(2, '0')
    }
  }

  filename = (extension) => {
    return `${Math.floor(Math.random() * 10000)}.${extension}`
  }

  uuid = () => {
    var dt = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0
      var y = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  }
  
  random = (list) => {
    return list[Math.floor(Math.random() * list.length)]
  }
   
  randomInt = (min, max) => {
    min = Math.ceil(min) 
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  formatter = (number) => {
    let num = parseInt(number)
    return Number(num).toLocaleString().replace(/,/g, '.')
  }
  
  formatNumber = (integer) => {
    let numb = parseInt(integer)
    return Number(numb).toLocaleString().replace(/,/g, '.')
  }
  
  h2k = (integer) => {
    let numb = parseInt(integer)
    return new Intl.NumberFormat('en-US', {
      notation: 'compact'
    }).format(numb)
  }
  
  formatSize = (size) => {
    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0)
      return Math.round(value * multiplier) / multiplier
    }
    var megaByte = 1024 * 1024
    var gigaByte = 1024 * megaByte
    var teraByte = 1024 * gigaByte
    if (size < 1024) {
      return size + ' B'
    } else if (size < megaByte) {
      return round(size / 1024, 1) + ' KB'
    } else if (size < gigaByte) {
      return round(size / megaByte, 1) + ' MB'
    } else if (size < teraByte) {
      return round(size / gigaByte, 1) + ' GB'
    } else {
      return round(size / teraByte, 1) + ' TB'
    }
    return ''
  }
  
  getSize = async (str) => {
    if (!isNaN(str)) return this.formatSize(str)
    let header = await (await axios.get(str)).headers
    return this.formatSize(header['content-length'])
  }
  
  getFile = (source, filename, referer) => {
    return new Promise(async (resolve) => {
      try {
        if (Buffer.isBuffer(source)) {
          let ext, mime
          try {
            mime = await (await fromBuffer(source)).mime
            ext = await (await fromBuffer(source)).ext
          } catch {
            mime = mime.lookup(filename ? filename.split`.`[filename.split`.`.length - 1] : 'txt')
            ext = mime.extension(mime)
          }
          let extension = filename ? filename.split`.`[filename.split`.`.length - 1] :
            ext
          let size = Buffer.byteLength(source)
          let filepath = tmpdir() + '/' + (q.Func.uuid() + '.' + ext)
          let file = fs.writeFileSync(filepath, source)
          let name = filename || path.basename(filepath)
          let data = {
            status: true,
            file: filepath,
            filename: name,
            mime: mime,
            extension: ext,
            size: await q.Func.getSize(size),
            bytes: size,
          }
          return resolve(data)
        } else if (source.startsWith('./')) {
          let ext, mime
          try {
            mime = await (await fromBuffer(source)).mime
            ext = await (await fromBuffer(source)).ext
          } catch {
            mime = mime.lookup(filename ? filename.split`.`[filename.split`.`.length - 1] : 'txt')
            ext = mime.extension(mime)
          }
          let extension = filename ? filename.split`.`[filename.split`.`.length - 1] : ext
          let size = fs.statSync(source).size
          let data = {
            status: true,
            file: source,
            filename: path.basename(source),
            mime: mime,
            extension: ext,
            size: await q.Func.getSize(size),
            bytes: size,
          }
          return resolve(data)
        } else {
          axios.get(source, {
            responseType: 'stream',
            headers: {
              Referer: referer || ''
            },
          }).then(async (response) => {
            let extension = filename ? filename.split`.`[filename.split`.`.length - 1] : mime.extension(response.headers['content-type'])
            let file = fs.createWriteStream(`${tmpdir()}/${q.Func.uuid() + "." + extension}`)
            let name = filename || path.basename(file.path)
            response.data.pipe(file)
            file.on('finish', async () => {
              let data = {
                status: true,
                file: file.path,
                filename: name,
                mime: mime.lookup(file.path),
                extension: extension,
                size: await q.Func.getSize(response.headers["content-length"] ? response.headers["content-length"] : 0),
                bytes: response.headers["content-length"] ?
                  response.headers["content-length"] : 0,
              }
              resolve(data)
              file.close()
            })
          })
        }
      } catch (e) {
        console.log(e)
        resolve({
          status: false,
        })
      }
    })
  }
 
  color = (text, color = "green") => {
    return chalk.keyword(color).bold(text)
  }

  mtype = (data) => {
    function cleanText(text) {
      return text
        .replace(/```/g, '')
        .replace(/_/g, '')
        .replace(/[*]/g, '')
    }
    let processedText = typeof data.text !== "object" ? cleanText(data.text) : ''
    return processedText
  }
 
  sizeLimit = (str, max) => {
    let data
    if (str.match('G') || str.match('GB') || str.match('T') || str.match('TB')) return data = {
      oversize: true
    }
    if (str.match('M') || str.match('MB')) {
      let first = str.replace(/MB|M|G|T/g, '').trim()
      if (isNaN(first)) return data = {
        oversize: true
      }
      if (first > max) return data = {
        oversize: true
      }
      return data = {
        oversize: false
      }
    } else {
      return data = {
        oversize: false
      }
    }
  }
  
  generateLink = (text) => {
    let urlRegex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi
    return text.match(urlRegex)
  }

  jsonFormat = (obj) => {
    try {
      let print = (obj && (obj.constructor.name == 'Object' || obj.constructor.name == 'Array')) ? util.format(JSON.stringify(obj, null, 2)) : util.format(obj)
      return print
    } catch {
      return util.format(obj)
    }
  }
  
  ucword = (str) => {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase()
    })
  }

  arrayJoin = (arr) => {
    let result = []
    for (let i = 0; i < arr.length; i++) {
      result = result.concat(arr[i])
    }
    return result
  }

  removeItem = (arr, item) => {
    let index = arr.indexOf(item)
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr
  }
  
  hitstat = (interactionId, sender) => {
    if (/bot|help|menu|stat|hitstat|hitdaily/.test(interactionId)) {
      return
    }
    if (typeof global.db === "undefined") {
      return
    }
    db.data.users = db.data.users || {}
    if (!db.data.users[interactionId]) {
      db.data.users[interactionId] = {
        'hitstat': 1,
        'today': 1,
        'lasthit': new Date().getTime(),
        'sender': sender.split('@')[0]
      }
    } else {
      db.data.users[interactionId].hit += 1
      db.data.users[interactionId].today += 1
      db.data.users[interactionId].lasthit = new Date().getTime()
      db.data.users[interactionId].sender = sender.split('@')[0]
    }
  }

  socmed = (url) => {
    const patterns = [
      /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/,
      /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/,
      /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:stories\/)(?:\S+)?$/,
      /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:s\/)(?:\S+)?$/,
      /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/,
      /pin(?:terest)?(?:\.it|\.com)/,
      /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/,
      /http(?:s)?:\/\/(?:www\.|mobile\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
      /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/,
      /^(?:https?:\/\/)?(?:podcasts\.)?(?:google\.com\/)(?:feed\/)(?:\S+)?$/
    ]
    return patterns.some(pattern => url.match(pattern))
  }

  matcher = (input, strings, options) => {
    const calculateDistance = (str1, str2, ignoreCase) => {
      let arr1 = []
      let arr2 = []
      let len1 = str1.length
      let len2 = str2.length
      let distance
      if (str1 === str2) {
        return 0
      }
      if (len1 === 0) {
        return len2
      }
      if (len2 === 0) {
        return len1
      }
      if (ignoreCase) {
        str1 = str1.toLowerCase()
        str2 = str2.toLowerCase()
      }
      for (let i = 0; i < len1; i++) {
        arr1[i] = str1.charCodeAt(i)
      }
      for (let j = 0; j < len2; j++) {
        let code = str2.charCodeAt(j)
        let previousRow = arr1.slice()
        let currentRow = []
        let minValue
        for (let i = 0; i < len1; i++) {
          minValue = Math.min(previousRow[i] + 1, currentRow[i - 1] + 1, arr1[i] === code ? previousRow[i - 1] : previousRow[i] + 1)
          currentRow.push(minValue)
        }
        arr1 = currentRow
      }
      return arr1[len1 - 1]
    }
    const calculateSimilarity = (inputStr, compareStr, options) => {
      let maxLen = Math.max(inputStr.length, compareStr.length)
      return ((maxLen === 0 ? 1 : (maxLen - calculateDistance(inputStr, compareStr, options.sensitive)) / maxLen) * 100).toFixed(1)
    }
    let result = []
    let targetArray = Array.isArray(strings) ? strings : [strings]
    targetArray.map(string => {
      result.push({
        'string': string,
        'accuracy': calculateSimilarity(input, string, options)
      })
    })
    return result
  }
  
  toDate = (ms) => {
    let temp = ms
    let days = Math.floor(ms / (24 * 60 * 60 * 1000))
    let daysms = ms % (24 * 60 * 60 * 1000)
    let hours = Math.floor((daysms) / (60 * 60 * 1000))
    let hoursms = ms % (60 * 60 * 1000)
    let minutes = Math.floor((hoursms) / (60 * 1000))
    let minutesms = ms % (60 * 1000)
    let sec = Math.floor((minutesms) / (1000))
    if (days == 0 && hours == 0 && minutes == 0) {
      return "Recently"
    } else {
      return days + "D " + hours + "H " + minutes + "M"
    }
  }

  timeFormat = (value) => {
    const sec = parseInt(value, 10)
    let hours = Math.floor(sec / 3600)
    let minutes = Math.floor((sec - (hours * 3600)) / 60)
    let seconds = sec - (hours * 3600) - (minutes * 60)
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    if (hours == parseInt('00')) return minutes + ':' + seconds
    return hours + ':' + minutes + ':' + seconds
  }
  
  switcher = (condition, option1, option2) => {
    return condition ? this.texted("bold", option1) : this.texted("bold", option2)
  }

  makeId = (length) => {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  
  timeReverse = (milliseconds) => {
    let days = Math.floor(milliseconds / 86400000)
    let hours = Math.floor((milliseconds / 3600000) % 24)
    let minutes = Math.floor((milliseconds / 60000) % 60)
    let seconds = Math.floor((milliseconds / 1000) % 60)
    let formattedHours = hours < 10 ? '0' + hours : hours
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    let formattedDays = days < 10 ? '0' + days : days
    return formattedDays + "D " + formattedHours + "H " + formattedMinutes + 'M'
  }

  greeting = () => {
    let hour = moment.tz(process.env.TZ || "Asia/Jakarta").format('HH')
    let greetingMessage = "Don't forget to sleep" 
    if (hour >= 18) {
      greetingMessage = "Good Night"
    } else if (hour >= 11) {
      greetingMessage = "Good Afternoon"
    } else if (hour >= 6) {
      greetingMessage = "Good Morning"
    } else if (hour >= 3) {
      greetingMessage = "Good Evening"
    }
    return greetingMessage
  }
  
  jsonRandom = (filePath) => {
    let jsonArray = JSON.parse(fs.readFileSync(filePath))
    return jsonArray[Math.floor(Math.random() * jsonArray.length)]
  }
  
  filter = (j) => {
    if (j.length > 10) {
      return j.substr(j.length - 5)
    } else {
      if (j.length > 7) {
        return j.substr(j.length - 4)  
      } else {
        if (j.length > 5) {
          return j.substr(j.length - 3)
        } else {
          if (j.length > 2) {
            return j.substr(j.length - 2)  
          } else {
            if (j.length > 1) {
              return j.substr(j.length - 1)
            }
          }  
        }
      }
    }
  }
  
  randomString = (j, q) => {
    const defaultChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/+=*-%$();?!#@"
    q = q || defaultChars
    let L = ''
    for (let J = 0; J < j; J++) {
      let W = Math.floor(Math.random() * q.length) 
      L += q.substring(W, W + 1)
    }
    return L  
  }

  reSize = async (j, q, f) => {
    return new Promise(async (J, W) => {
      var D = await read(j)
      var resizedImage = await D.resize(q, f).getBufferAsync(MIME_JPEG)
      J(resizedImage)
    })
  }

  Styles = (text, style = 1) => {
    var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('')
    var yStr = Object.freeze({
      1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
    })
    var replacer = []
    xStr.map((v, i) => replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
    }))
    var str = text.toLowerCase().split('')
    var output = []
    str.map(v => {
      const find = replacer.find(x => x.original == v)
      find ? output.push(find.convert) : output.push(v)
    })
    return output.join('')
  }
  
  logFile = (j, q = "bot") => {
    const logStream = fs.createWriteStream(path.join(process.cwd(), q + ".log"), {
      'flags': 'a'
    })
    const timestamp = moment(new Date() * 1).format("DD/MM/YY HH:mm:ss")
    logStream.write('[' + timestamp + "] - " + j + "\n")
  }
}