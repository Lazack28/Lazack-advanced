//process.on('uncaughtException', console.error)
const { DisconnectReason } = (await import('baileys')).default
import configs from '../../Setting/settings.mjs'
import fakeHelper from '../helper/fake.mjs'
import { Boom } from '@hapi/boom'
import { _ } from './logger.lib.mjs'

/**
 * Connection Update from whatsapp
 * @param {*} events
 * @param {*} serve
 * @param {*} star
 * @return { connection }
**/
const connectionUpdateLib = async (events, serve, star) => {
  let { lastDisconnect, connection } = events
  try {
    if (connection == 'close') {
      if (new Boom(lastDisconnect.error).output?.statusCode === DisconnectReason.loggedOut) star()
      else star()
    } else if (connection == 'connecting') {
      _.wait()
    } else if (connection == 'open') {
      console.warn('Connected...')
      serve.sendteks(configs.developer[0] + configs.idwa, configs.connect, fakeHelper.f1("Notifikasi Connection", ""))
    }
  } catch (e) {
    console.log(e)
  }
}

export default connectionUpdateLib