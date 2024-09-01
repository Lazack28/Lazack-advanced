require('./settings');

const fs = require('fs');

const pino = require('pino');

const path = require('path');

const axios = require('axios');

const chalk = require('chalk');

const readline = require('readline');

const FileType = require('file-type');

const { exec } = require('child_process');

const { Boom } = require('@hapi/boom');

const NodeCache = require('node-cache');

const PhoneNumber = require('awesome-phonenumber');

const { default: WAConnection, useMultiFileAuthState, Browsers, DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, fetchLatestWaWebVersion, proto, PHONENUMBER_MCC, getAggregateVotesInPollMessage } = require('@whiskeysockets/baileys');



const pairingCode = global.pairing_code || process.argv.includes('--pairing-code');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

const question = (text) => new Promise((resolve) => rl.question(text, resolve))



global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')



const DataBase = require('./src/database');

const database = new DataBase();

(async () => {

	const loadData = await database.read()

	if (loadData && Object.keys(loadData).length === 0) {

		global.db = {

			set: {},

			users: {},

			game: {},

			groups: {},

			database: {},

			...(loadData || {}),

		}

		await database.write(global.db)

	} else {

		global.db = loadData

	}

	

	setInterval(async () => {

		if (global.db) await database.write(global.db)

	}, 30000)

})();



const { GroupUpdate, GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./src/message');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/function');



/*

	* Create By Naze

	* Follow https://github.com/nazedev

	* Whatsapp : wa.me/6282113821188

*/



async function startXeonBot() {

	const { state, saveCreds } = await useMultiFileAuthState('session');

	const { version, isLatest } = await fetchLatestWaWebVersion();

	const msgRetryCounterCache = new NodeCache();

	const level = pino({ level: 'silent' })

	

	const getMessage = async (key) => {

		if (store) {

			const msg = await store.loadMessage(key.remoteJid, key.id);

			return msg?.message || ''

		}

		return {

			conversation: 'Halo Saya Naze Bot'

		}

	}

	

	const XeonBotInc = WAConnection({

		isLatest,

		//version: [2, 3000, 1015901307],

		logger: level,

		printQRInTerminal: !pairingCode,

		browser: Browsers.ubuntu('Chrome'),

		auth: {

			creds: state.creds,

			keys: makeCacheableSignalKeyStore(state.keys, level),

		},

		transactionOpts: {

			maxCommitRetries: 10,

			delayBetweenTriesMs: 10,

		},

		getMessage,

		syncFullHistory: true,

		maxMsgRetryCount: 15,

		msgRetryCounterCache,

		retryRequestDelayMs: 10,

		defaultQueryTimeoutMs: 0,

		connectTimeoutMs: 60000,

		keepAliveIntervalMs: 10000,

		generateHighQualityLinkPreview: true,

	})

	

	if (pairingCode && !XeonBotInc.authState.creds.registered) {

		let phoneNumber;

		async function getPhoneNumber() {

			phoneNumber = await question('Please type your WhatsApp number : ');

			phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

			

			if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v)) && !phoneNumber.length < 6) {

				console.log(chalk.bgBlack(chalk.redBright('Start with your Country WhatsApp code') + chalk.whiteBright(',') + chalk.greenBright(' Example : 62xxx')));

				await getPhoneNumber()

			}

		}

		

		setTimeout(async () => {

			await getPhoneNumber()

			await exec('rm -rf ./session/*')

			let code = await XeonBotInc.requestPairingCode(phoneNumber);

			console.log(`Your Pairing Code : ${code}`);

		}, 3000)

	}

	

	store.bind(XeonBotInc.ev)

	

	await Solving(XeonBotInc, store)

	

	XeonBotInc.ev.on('creds.update', saveCreds)

	

	XeonBotInc.ev.on('connection.update', async (update) => {

		const { connection, lastDisconnect, receivedPendingNotifications } = update

		if (connection === 'close') {

			const reason = new Boom(lastDisconnect?.error)?.output.statusCode

			if (reason === DisconnectReason.connectionLost) {

				console.log('Connection to Server Lost, Attempting to Reconnect...');

				startXeonBot()

			} else if (reason === DisconnectReason.connectionClosed) {

				console.log('Connection closed, Attempting to Reconnect...');

				startXeonBot()

			} else if (reason === DisconnectReason.restartRequired) {

				console.log('Restart Required...');

				startXeonBot()

			} else if (reason === DisconnectReason.timedOut) {

				console.log('Connection Timed Out, Attempting to Reconnect...');

				startXeonBot()

			} else if (reason === DisconnectReason.badSession) {

				console.log('Delete Session and Scan again...');

				startXeonBot()

			} else if (reason === DisconnectReason.connectionReplaced) {

				console.log('Close current Session first...');

				startXeonBot()

			} else if (reason === DisconnectReason.loggedOut) {

				console.log('Scan again and Run...');

				exec('rm -rf ./session/*')

				process.exit(1)

			} else if (reason === DisconnectReason.Multidevicemismatch) {

				console.log('Scan again...');

				exec('rm -rf ./session/*')

				process.exit(0)

			} else {

				XeonBotInc.end(`Unknown DisconnectReason : ${reason}|${connection}`)

			}

		}

		if (connection == 'open') {

			console.log('Connected to : ' + JSON.stringify(XeonBotInc.user, null, 2));

		}

		if (receivedPendingNotifications == 'true') {

			console.log('Please wait About 1 Minute...')

			XeonBotInc.ev.flush()

		}

	});

	

	XeonBotInc.ev.on('contacts.update', (update) => {

		for (let contact of update) {

			let id = XeonBotInc.decodeJid(contact.id)

			if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }

		}

	});

	

	XeonBotInc.ev.on('call', async (call) => {

		let botNumber = await XeonBotInc.decodeJid(XeonBotInc.user.id);

		if (db.set[botNumber].anticall) {

			for (let id of call) {

				if (id.status === 'offer') {

					let msg = await XeonBotInc.sendMessage(id.from, { text: `Saat Ini, Kami Tidak Dapat Menerima Panggilan ${id.isVideo ? 'Video' : 'Suara'}.\nJika @${id.from.split('@')[0]} Memerlukan Bantuan, Silakan Hubungi Owner :)`, mentions: [id.from]});

					await XeonBotInc.sendContact(id.from, global.owner, msg);

					await XeonBotInc.rejectCall(id.id, id.from)

				}

			}

		}

	});

	

	XeonBotInc.ev.on('groups.update', async (update) => {

		await GroupUpdate(XeonBotInc, update, store);

	});

	

	XeonBotInc.ev.on('group-participants.update', async (update) => {

		await GroupParticipantsUpdate(XeonBotInc, update, store);

	});

	

	XeonBotInc.ev.on('messages.upsert', async (message) => {

		await MessagesUpsert(XeonBotInc, message, store);

	});



	return XeonBotInc

}



startXeonBot()



let file = require.resolve(__filename)

fs.watchFile(file, () => {

	fs.unwatchFile(file)

	console.log(chalk.redBright(`Update ${__filename}`))

	delete require.cache[file]

	require(file)

});
