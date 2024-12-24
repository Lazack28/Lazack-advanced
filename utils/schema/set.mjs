const handle = async (m, { q, conn, bot, db }) => {
  // write default database
  let cari = db.set.find((v) => v[0] == bot)
  let i = db.set.findIndex((v) => v[0] == bot)
  
  // property of array
  let publik = true // [1][0]
  let call = true // [1][1]
  let group = true // [1][2]
  let main = false // [1][3]
  let antitag = false // [1][4]
  let store = {} // [1][5]
  let pack = "Sticker by" // [1][6]
  let auth = "© airi miyu" // [1][7]
  let setmenu = "list" // [1][7]
  let backup = false
  let lastbackup = Date.now()
  
  if (cari) {
    if (!db.set[i][1].publik) Object.assign(db.set[i][1], { publik })
    if (!db.set[i][1].call) Object.assign(db.set[i][1], { call })
    if (!db.set[i][1].group) Object.assign(db.set[i][1], { group })
    if (!db.set[i][1].main) Object.assign(db.set[i][1], { main })
    if (!db.set[i][1].antitag) Object.assign(db.set[i][1], { antitag })
    if (!db.set[i][1].store) Object.assign(db.set[i][1], { store })
    if (!db.set[i][1].pack) Object.assign(db.set[i][1], { pack })
    if (!db.set[i][1].auth) Object.assign(db.set[i][1], { auth })
    if (!db.set[i][1].setmenu) Object.assign(db.set[i][1], { setmenu })
    if (!db.set[i][1].backup) Object.assign(db.set[i][1], { backup })
    if (!db.set[i][1].lastbackup) Object.assign(db.set[i][1], { lastbackup })
  } else if (!cari) {
    db.set.push([bot, {
      publik,
      call,
      group,
      main,
      antitag,
      store,
      pack,
      auth,
      setmenu,
      backup,
      lastbackup
    }])
  }
}

export default handle