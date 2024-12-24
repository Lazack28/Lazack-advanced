import { users, groups, sets } from '../schema/index.mjs'
import { db } from '../db/database.mjs'
import groupsUpdateHandler from './groups.update.handler.mjs'
import parsingMessagesHandler from './parsing.messages.handler.mjs'
import controlers from '../../features/controlers.mjs'
import loggerMessage from '../lib/logger.lib.mjs'
import fakeHelper from '../helper/fake.mjs'

const bb = (teks) => "```" + teks + "```"
const isntNull = (x) => x !== null
const findAdmin = (arr) => arr.filter((v) => v.admin !== null).map((i) => i.id)
let cache = new Map()

const messagesUpsertHandler = async (events, connection, s, configs) => {
  try {
    connection.conn2 = connection.conn2 ?? {}
    connection.slot = connection.slot ?? {}
    connection.messu = connection.messu ?? {}
    connection.ngotak = connection.ngotak ?? {}
    connection.caklontong = connection.caklontong ?? {}
    connection.family = connection.family ?? {}
    connection.addfamily = connection.addfamily ?? {}
    connection.siapakahaku = connection.siapakahaku ?? {}
    connection.susunkata = connection.susunkata ?? {}
    connection.bendera = connection.bendera ?? {}
    connection.kata = connection.kata ?? {}
    connection.gambare = connection.gambare ?? {}
    connection.kalimat = connection.kalimat ?? {}
    connection.kimia = connection.kimia ?? {}
    connection.reqbeg = connection.reqbeg ?? {}
    let event = events.messages[0]
    if (!event) return
    if (event.key.remoteJid === configs.idst) return
    await connection.readMessages([event.key])
    if (event.key.id.endsWith("BOLA") && event.key.id.length === 32) return
    if (event.key.id.startsWith("3EB0") && event.key.id.length === 12) return
    let m = parsingMessagesHandler(connection, event, s)
    let bot = await connection.createJid(connection.user.id)
    let noPrefix = typeof m.text === 'string' && typeof m.preff === 'string' ? m.text.replace(m.preff, '') : m.text || ''
    let _args = noPrefix.trim().split` `.slice(1)
    let tek = _args.join` `
    if (m.isGc) {
      if (!cache.has(m.chat)) {
        cache.set(m.chat, await connection.groupMetadata(m.chat).catch((_) => {}))
        console.log(`Pembuatan metadata pada *${m.chat}* telah siap`)
      }
    }
    let extra = {}
    extra.q = configs
    extra.d = fakeHelper
    extra.up = event
    extra.bb = bb
    extra.findAdmin = findAdmin
    extra.conn = connection
    extra.cache = cache
    extra.db = {
      users: db.user,
      grup: db.grup,
      set: db.set,
      cmd: db.cmd
    }
    extra.find = {
      u: db.user.findIndex((v) => v[0] == m.sender),
      g: db.grup.findIndex((v) => v[0] == m.chat),
      b: db.set.findIndex((v) => v[0] == bot),
      users: (sender) => db.user.findIndex((v) => v[0] == sender),
      grup: (chat) => db.grup.findIndex((v) => v[0] == chat)
    }
    extra.repl = (text) => connection.sendteks(m.chat, text, m)
    extra.isNum = (x) => typeof x == "number" && isNaN(x)
    extra.more = String.fromCharCode(8206).repeat(4001)
    extra.budy = typeof m.text == "string" ? m.text : ""
    extra.bot = bot
    extra.lblock = await connection.fetchBlocklist().catch((_) => [])
    extra.isblock = m.isGc ? extra.lblock.includes(m.sender) : false
    extra.meta = m.isGc ? await cache.get(m.chat) : {} || {}
    extra.members = m.isGc ? await extra.meta?.participants : [] || []
    extra.admins = m.isGc ? await findAdmin(extra.members) : [] || []
    extra.isAdmin = m.isGc ? extra.admins.includes(m.sender) : false
    extra.isBotAdmin = m.isGc ? extra.admins.includes(extra.bot) : false
    extra.isPrem = configs.prems.map((v) => v + configs.idwa).includes(m.sender)
    extra.getpp = async (sender) => await connection.profilePictureUrl(sender, "image").catch((e) => configs.thumb2)
    extra.quoted = m.quoted ? m.quoted : m
    extra.quotry = m.quoted ? m.quoted.text : m.query
    extra.text = tek
    extra.Func = extra.q.Func
    extra.mime = (extra.quoted.msg || extra.quoted).mimetype || extra.quoted.mediaType || ""
    users(m, extra)
    groups(m, extra)
    sets(m, extra)
    loggerMessage(m, extra)
    if (extra.find.u === -1) return extra.repl("Menyiapkan database untuk anda")
    groupsUpdateHandler(m, extra)
    controlers(m, extra)
  } catch (e) {
    console.error(e)
  }
}

export default messagesUpsertHandler