import configs from '../../Setting/settings.mjs'
import baileys from 'baileys'
import pino from 'pino'
import NodeCache from 'node-cache'

const logger = pino({ level: 'silent' })
const store = baileys.makeInMemoryStore({ logger })
const msgRetryCounterCache = new NodeCache()

const configConnectionDefault = {
  version: [2, 3000, 1015901307],
  logger: logger,
  browser: configs.browser,
  printQRInTerminal: true,
  defaultQueryTimeoutMs: undefined,
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  getMessage: async (key) => {
    let jid = baileys.jidNormalizedUser(key.remoteJid)
    let msg = await store.loadMessage(jid, key.id)
    return msg?.["message"] || ''
  },
  msgRetryCounterCache,
  syncFullHistory: true
}

const configConnectionJadibot = {
  printQRInTerminal: false,
  markOnlineOnConnect: true,
  syncFullHistory: false,
  qrTimeout: configs.longqr,
  logger,
  patchMessageBeforeSending: (message) => {
    const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage)
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {}
            },
            ...message
          }
        }
      }
    }

    return message
  }
}

export default configConnectionDefault
export { configConnectionJadibot, store, logger }