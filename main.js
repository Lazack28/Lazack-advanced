process.on("uncaughtException", console.error)
import http from 'http'
import { join } from 'path'
import { accessSync, writeFileSync } from 'fs'
import baileys, { useMultiFileAuthState } from 'baileys'
import configs from './Setting/settings.mjs'
import { _ } from './utils/lib/logger.lib.mjs'
import simpleDeclarationsLib from './utils/lib/simple.declarations.lib.mjs'
import connectionUpdateLib from './utils/lib/connection.update.lib.mjs'
import configConnectionDefault, { store } from './utils/lib/config.connection.lib.mjs'
import initDatabase from './utils/db/database.mjs'
import prototypeHelper from './utils/helper/prototype.mjs'
import messagesUpsertHandler from './utils/handler/messages.upsert.handler.mjs'
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

/**
 * @param
 * @returns
**/
async function main() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(configs.session)
    const chat = baileys.default(Object.assign(configConnectionDefault, { auth: state }))
    store.bind(chat.ev)
    simpleDeclarationsLib(chat)
    try {
      accessSync(join(configs.session, 'app_run.txt'))
    } catch (e) {
      writeFileSync(join(configs.session, 'app_run.txt'), JSON.stringify(Date.now(), null, 2))
    }
    chat.ev.on('connection.update', async (update) => connectionUpdateLib(update, chat, main))
    chat.ev.on('messages.upsert', async (update) => messagesUpsertHandler(update, chat, store, configs))
    chat.ev.on('creds.update', saveCreds)
    return chat
  } catch (e) {
    console.log(e)
  }
}

prototypeHelper()

initDatabase()

console.log(_.p())

http.createServer((_, res) => res.end('UPTIMEEE ROBOT')).listen(8080)

main()