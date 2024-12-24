const handle = async (m, { q, conn, db }) => {
  // write default database
  let cari = db.users.find((v) => v[0] == m.sender)
  let u = db.users.findIndex((v) => v[0] == m.sender)
  
  // property of array
  var win = 0 // [1].win
  var lose = 0 // [1].lose
  var uang = 0 // [1].coin
  var lastclaim = Date.now() // [1].lastclaim
  var reason = null // [1].reason
  var lastafk = -1 // [1].lastafk
  var premium = 0
  var daftar = false
  var remindprem = false
  
  // indentify user in arrays database
  if (cari) {
    if (!db.users[u][1].lastclaim) Object.assign(db.users[u][1], { lastclaim })
    if (!db.users[u][1].reason) Object.assign(db.users[u][1], { reason })
    if (!db.users[u][1].lastafk) Object.assign(db.users[u][1], { lastafk })
    if (!db.users[u][1].premium) Object.assign(db.users[u][1], { premium })
    if (!db.users[u][1].remindprem) Object.assign(db.users[u][1], { remindprem })
    if (!db.users[u][1].daftar) Object.assign(db.users[u][1], { daftar })
  } else if (!cari) {
    db.users.push([m.sender, {
      lastclaim,
      reason,
      lastafk,
      premium,
      daftar
    }])
  }
}

export default handle