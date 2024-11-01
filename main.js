(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  require("./lib/system/config");
  const {
    useMultiFileAuthState,
    DisconnectReason,
    makeInMemoryStore,
    jidNormalizedUser,
    makeCacheableSignalKeyStore,
    PHONENUMBER_MCC,
    fetchLatestBaileysVersion,
    proto,
    MessageRetryMap
  } = require("@whiskeysockets/baileys");
  const {
    makeWASocket,
    MongoDB,
    lowdb,
    CloudDBAdapter,
    Function
  } = new (require("@im-dims/wb"))();
  const readline = require("readline");
  const chalk = require("chalk");
  const path = require("path");
  const fs = require('fs');
  const yargs = require("yargs/yargs");
  const cp = require("child_process");
  const _ = require("lodash");
  const syntaxerror = require("syntax-error");
  const pino = require("pino");
  const os = require('os');
  const env = require("./lib/system/config");
  
  var low;
  try {
    low = require("lowdb");
  } catch (e) {
    low = lowdb;
  }  
  const { Low, JSONFile } = low;
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const Random = os.platform() === "win32" ? "Windows" : os.platform() === "darwin" ? "MacOS" : "Linux";
  const Logger = pino({ level: "fatal" }).child({ level: "fatal" });
  const question = (text) => new Promise((resolve) => rl.question((text), (resolve)));
  
  global.timestamp = {
    start: new Date()
  };
  
  global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname] : global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '') 
  global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  global.prefix = new RegExp('^[' + (opts.prefix || "!+/#.") + ']');

  global.store = makeInMemoryStore({
    logger: pino({
      level: "fatal"
    }).child({
      level: "fatal",
      stream: "store"
    })
  });
  
  // disimpan ke store.json setiap 10 detik
  store?.readFromFile('./store.json')
  setInterval(() => {
    store?.writeToFile('./store.json')
  }, 10_000)

  global.db = new Low(/https?:\/\//.test(env.databaseurl || '') ? CloudDBAdapter(env.databaseurl) : /mongodb/.test(env.databaseurl) ? new MongoDB(env.databaseurl) : new JSONFile((opts._[0] ? opts._[0] + '_' : '') + "database.json"));
  global.DATABASE = global.db;
  global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) {
      return new Promise((resolve) => setInterval(function () {
        if (!global.db.READ) {
          clearInterval(this);
          (resolve)(global.db.data == null ? global.loadDatabase() : global.db.data);
        } else {
          null;
        }
      }, 1000));
    }
    if (global.db.data !== null) {
      return;
    }
    global.db.READ = true;
    await global.db.read();
    global.db.READ = false;
    global.db.data = {
      'users': {},
      'groups': {},
      'chats': {},
      'setting': {},
      'stats': {},
      'msgs': {},
      'menfess': {},
      'sticker': {},
      'chara': '',
      ...(global.db.data || {})
    };
    global.db.chain = _.chain(global.db.data);
  };
  loadDatabase();
  
  const authFolder = '' + (opts._[0] || "session");
  global.isInit = !fs.existsSync(authFolder);
  const { state, saveCreds } = await useMultiFileAuthState(authFolder);
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const connectionOptions = {
    version: version,
    logger: Logger,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Logger)
    },
    browser: [Random, "Chrome", "20.0.04"],
    printQRInTerminal: !env.pairing.state,
    defaultQueryTimeoutMs: undefined,
    isLatest: true, // set the correct value for isLatest 
    markOnlineOnConnect: false,
    generateHighQualityLinkPreview: true
  };
  
  global.conn = makeWASocket(connectionOptions);
  store.bind(conn.ev, { groupMetadata: conn.groupMetadata });
  
  if (env.pairing.state && !conn.authState.creds.registered) {
    let PhoneNumber;
    if (!!env.pairing.number) {
      PhoneNumber = env.pairing.number.toString().replace(/[^0-9]/g, '');
      if (!Object.keys(PHONENUMBER_MCC).some(v => PhoneNumber.startsWith(v))) {
        console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")));
        process.exit(0);
      }
    } else {
      PhoneNumber = await question(chalk.bgBlack(chalk.greenBright("Please type your WhatsApp number : ")));
      PhoneNumber = PhoneNumber.replace(/[^0-9]/g, '');
      if (!Object.keys(PHONENUMBER_MCC).some(v => PhoneNumber.startsWith(v))) {
        console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")));
        PhoneNumber = await question(chalk.bgBlack(chalk.greenBright("Please type your WhatsApp number : ")));
        PhoneNumber = PhoneNumber.replace(/[^0-9]/g, '');
        rl.close();
      }
    }
    setTimeout(async () => {
      let code = await conn.requestPairingCode(PhoneNumber);
      code = code?.["match"](/.{1,4}/g)?.["join"]('-') || code;
      console.log(chalk.black(chalk.bgGreen("Your Pairing Code : ")), chalk.black(chalk.white(code)));
    }, 3000);
  }
  
  if (!opts.test) {
    if (global.db) {
      setInterval(async () => {
        if (global.db.data) {
          await global.db.write();
        }
        if (!opts.tmp && (global.support || {}).find) {
          tmp = [os.tmpdir(), "tmp"];
          tmp.forEach(_0x26b1ea => cp.spawn("find", [_0x26b1ea, "-amin", '3', "-type", 'f', "-delete"]));
        }
      }, 30000);
    }
  }
  
  const clear = setInterval(() => {
    var nah = process.memoryUsage().rss;
    if (nah >= require("bytes")(env.ram_limit)) {
      clearInterval(clear);
      process.send("reset");
    }
  }, 60000);
  
  if (!fs.existsSync("./tmp")) {
    fs.mkdirSync("./tmp");
  }
  
  setInterval(async () => {
    try {
      const folder = fs.readdirSync("./tmp");
      if (folder.length > 0) {
        folder.filter(sampah => !sampah.endsWith(".file")).map(v => fs.unlinkSync("./temp/" + v));
      }
      const folderSessi = [];
      const sampahSessi = await fs.readdirSync("./session");
      for (const x of sampahSessi) {
        if (x != "creds.json") {
          folderSessi.push(path.join("./session", x));
        }
      }
      await Promise.allSettled(folderSessi.map(async tempat => {
        const ini = await fs.statSync(tempat);
        if (ini.isFile() && Date.now() - ini.mtimeMs >= 3600000) {
          if (platform() === "win32") {
            let itu;
            try {
              itu = await fs.openSync(tempat, 'r+');
            } catch (e) {
            } finally {
              await itu.close();
            }
          }
          await fs.unlinkSync(tempat);
        }
      }));
    } catch {
    }
  }, 600000);
  
  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin } = update;
    const last = lastDisconnect?.["error"]?.["output"]?.["statusCode"] !== DisconnectReason.loggedOut;
    if (connection === "close") {
      if (last) {
        try {
          console.log("Connection closed, Reconnecting. . .");
          await global.reloadHandler(true);
          global.timestamp.connect = new Date();
        } catch (error) {
          console.log("-- ERROR LOG --");
          console.log(error);
        }
      } else {
        console.log(chalk.red("Device loggedOut"));
        process.exit(0);
      }
    } else {
      if (connection == "open") {
        console.log("Opened connection ✅");
      }
    }
    if (db.data == null) {
      loadDatabase();
    }
  }
  
  process.on("uncaughtException", console.error);
  const _0x1b9662 = _0xb5512d => {
    _0xb5512d = require.resolve(_0xb5512d);
    let _0x232eb4;
    let _0x1ec885 = 0;
    do {
      if (_0xb5512d in require.cache) {
        delete require.cache[_0xb5512d];
      }
      _0x232eb4 = require(_0xb5512d);
      _0x1ec885++;
    } while ((!_0x232eb4 || Array.isArray(_0x232eb4) || _0x232eb4 instanceof String ? !(_0x232eb4 || []).length : typeof _0x232eb4 == "object" && !Buffer.isBuffer(_0x232eb4) ? !Object.keys(_0x232eb4 || {}).length : true) && _0x1ec885 <= 10);
    return _0x232eb4;
  };
  let isInit = true;
  global.reloadHandler = function (restatConn) {
    let handler = _0x1b9662("./handler");
    if (restatConn) {
      try {
        global.conn.ws.close();
      } catch {}
      global.conn = {
        ...global.conn,
        ...makeWASocket(connectionOptions)
      };
    }
    if (!isInit) {
      conn.ev.off("messages.upsert", conn.handler);
      conn.ev.off("group-participants.update", conn.participantsUpdate);
      conn.ev.off("message.delete", conn.onDelete);
      conn.ev.off("connection.update", conn.connectionUpdate);
      conn.ev.off("creds.update", conn.credsUpdate);
    }
    conn.welcome = "Thanks @user for joining into @subject group.";
    conn.bye = "Good bye @user :)";
    conn.spromote = "@user is now admin!";
    conn.sdemote = "@user is now not admin!";
    conn.handler = handler.handler.bind(conn);
    conn.participantsUpdate = handler.participantsUpdate.bind(conn);
    conn.onDelete = handler["delete"].bind(conn);
    conn.connectionUpdate = connectionUpdate.bind(conn);
    conn.credsUpdate = saveCreds.bind(conn);
    conn.ev.on("messages.upsert", conn.handler);
    conn.ev.on("group-participants.update", conn.participantsUpdate);
    conn.ev.on("message.delete", conn.onDelete);
    conn.ev.on("connection.update", conn.connectionUpdate);
    conn.ev.on("creds.update", conn.credsUpdate);
    isInit = false;
    return true;
  };
  
  let pluginFolder = path.join(__dirname, "plugins");
  let pluginFilter = filename => /\.js$/.test(filename);
  global.plugins = {};
  for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      global.plugins[filename] = require(path.join(pluginFolder, filename));
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
  console.log(Object.keys(global.plugins));
  global.reload = (_ev, filename) => {
    if (/\.js$/.test(filename)) {
      let dir = path.join(pluginFolder, filename)
      if (dir in require.cache) {
        delete require.cache[dir]
        if (fs.existsSync(dir)) {
          conn.logger.info("re - require plugin '" + filename + "'")
        } else {
          conn.logger.warn("deleted plugin '" + filename + "'")
          return delete global.plugins[filename]
        }
      } else {
        conn.logger.info("requiring new plugin '" + filename + "'")
      }
      let err = syntaxerror(fs.readFileSync(dir), filename)
      if (err) {
        conn.logger.error("syntax error while loading '" + filename + "'\n" + err)
      } else {
        try {
          global.plugins[filename] = require(dir)
        } catch (e) {
          conn.logger.error(e)
        } finally {
          global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
        }
      }
    }
  }
  Object.freeze(global.reload)
  fs.watch(path.join(__dirname, 'plugins'), global.reload)
  global.reloadHandler()
  
  async function _quickTest() {
    let test = await Promise.all([
      cp.spawn('ffmpeg'),
      cp.spawn('ffprobe'),
      cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
      cp.spawn('convert'),
      cp.spawn('magick'),
      cp.spawn('gm'),
      cp.spawn('find', ['--version'])
    ].map(p => {
      return Promise.race([
        new Promise(resolve => {
          p.on('close', code => {
            resolve(code !== 127)
          })
	    }),
	    new Promise(resolve => {
	      p.on('error', _ => resolve(false))
	    })
      ])
    }))
    let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
    console.log(test)

    let s = support = {
      ffmpeg,
      ffprobe,
      ffmpegWebp,
      convert,
      magick,
      gm,
      find
    }
    Object.freeze(support)

    if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
    if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
    if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
  }
  _quickTest()
    .then(() => conn.logger.info("Quick Test Done ✅"))
    .catch(console.error);
})();