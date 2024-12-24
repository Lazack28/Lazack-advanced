export default function proto() {
  Number.prototype.rupiah = function rupiah() {
    var tostr = this.toString()
    var mlds = tostr.length % 3
    var iris = tostr.substr(0, mlds)
    var ribu = tostr.substr(mlds).match(/\d{3}/g)
    let res
    if (ribu) {
      res = mlds ? "," : ""
      iris += res + ribu.join(",")
    }
    return iris
  }

  Array.prototype.rendem = function rendem() {
    return this[Math.floor(Math.random() * this.length)]
  }
  
  Number.prototype.datestring = function datestring() {
    let year = this.getFullYear(),
      moon = this.getMonth(),
      date = this.getDate(),
      hours = this.getHours(),
      minutes = this.getMinutes()
    return `${date}-${moon + 1}-${year} ${hours}:${minutes}`
  }
  
  Array.prototype.rendem = function rendem() {
    return this[Math.floor(Math.random() * this.length)]
  }
  
  Number.prototype.timers = function timers() {
    const seconds = Math.floor((this / 1000) % 60),
      minutes = Math.floor((this / (60 * 1000)) % 60),
      hours = Math.floor((this / (60 * 60 * 1000)) % 24),
      days = Math.floor(this / (24 * 60 * 60 * 1000))
     return `${days ? `${days} Hari ` : ""} ${hours ? `${hours} Jam ` : ""} ${minutes ? `${minutes} Menit ` : ""} ${seconds ? `${seconds} Detik` : ""}`
  }

  Number.prototype.sizeString = function sizeString(des = 2) {
    if (this === 0) return "0 Bytes"
    const dm = des < 0 ? 0 : des
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    const i = Math.floor(Math.log(this) / Math.log(1024))
    return parseFloat((this / Math.pow(1024, i)).toFixed(dm)) + " " + sizes[i]
  }
}