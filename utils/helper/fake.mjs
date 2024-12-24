import configs from '../../Setting/settings.mjs'

export default {
  // Fake Whatsapp status [ by : bolaxd ]
  f1: (u, b) => {
    let ll = {
      key: { 
        remoteJid: configs.idst, 
        participant: `0${configs.idwa}` 
      },
      message: {
        orderMessage: {
          itemCount: 2022,
          status: 1,
          surface: 1,
          message: u,
          orderTitle: ``,
          thumbnail: b,
          sellerJid: `0${configs.idwa}`
        }
      }
    }
    return ll
  },
  // Fake Thumbnail Large [ by : Davekgw ]
  f2: (a, b, c) => {
    let pp = {
      contextInfo: {
        isForwarded: true,
        forwardingScore: 9999,
        externalAdReply: {
          mediaType: 1,
          title: a,
          thumbnail: { url: b },
          thumbnailUrl: b,
          sourceUrl: c,
          renderLargerThumbnail: true
        }
      }
    }
    return pp
  }
  // Tambahin sendiri dibawah jgn manja
}