const groupsUpdateHandler = async (m, { up, q, d, conn, bot, cache, db, find }) => {
  let senderParticipant = up.key.participant
  let messageStubParams = up.messageStubParameters
  if (m.isGc) {
    let { g } = find
    switch (up.messageStubType) {
      // DETEK SUBJECT
      case 21: {
        let chat = cache.get(m.chat)
        chat.subject = messageStubParams.join()
        chat.subjectOwner = senderParticipant
        chat.subjectTime = Date.now()
        cache.set(m.chat, chat)
        console.log(`Menyingkronkan Ulang Metadata Pada Chat: ${m.chat}`)
        if (!db.grup[g][1].detect) return
        let text = q.fsub.replace("@sub", messageStubParams.join()).replace("@admin", "@" + senderParticipant.split("@")[0])
        conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text)
        })
        break
      }
      
      // DETEK PP UPDATE GC
      case 22: {
        if (!db.grup[g][1].detect) return
        let text = q.fppgc.replace("@admin", "@" + senderParticipant.split("@")[0])
        conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text)
        })
        break
      }
      
      // DETEK SETTING GC
      case 25: {
        if (messageStubParams.includes("off")) {
          let chat = cache.get(m.chat)
          chat.restrict = false
          cache.set(m.chat, chat)
          console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
          if (!db.grup[g][1].detect) return
          let text = q.fbinp.replace("@admin", "@" + senderParticipant.split("@")[0])
          return conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
            mentions: await conn.ments(text)
          })
        } else if (messageStubParams.includes("on")) {
          let chat = cache.get(m.chat)
          chat.restrict = true
          cache.set(m.chat, chat)
          console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
          if (!db.grup[g][1].detect) return
          let text = q.ftinp.replace("@admin", "@" + senderParticipant.split("@")[0])
          return conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
            mentions: await conn.ments(text)
          })
        }
        break
      }

      // DETEK TUTUP/BUKA GC
      case 26: {
        if (messageStubParams.includes("off")) {
          let chat = cache.get(m.chat)
          chat.announce = false
          cache.set(m.chat, chat)
          console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
          if (!db.grup[g][1].detect) return
          let text = q.fbgc.replace("@admin", "@" + senderParticipant.split("@")[0])
          return conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
            mentions: await conn.ments(text)
          })
        }
        if (messageStubParams.includes("on")) {
          let chat = cache.get(m.chat)
          chat.announce = true
          cache.set(m.chat, chat)
          console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
          if (!db.grup[g][1].detect) return
          let text = q.ftgc.replace("@admin", "@" + senderParticipant.split("@")[0])
          return conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
            mentions: await conn.ments(text)
          })
        }
        console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
        break
      }

      // ADD
      case 27: {
        let chat = cache.get(m.chat)
        for (let u of messageStubParams) {
          chat.participants.push({ id: u, admin: null })
          chat.size += 1
        }
        cache.set(m.chat, chat)
        console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
        if (!db.grup[g][1].detect) return
        let text = (v) => v.replace("@admin", "@" + senderParticipant.split("@")[0]).replace("@user", messageStubParams.map((v) => `@${v.split("@")[0]}`).join(", "))
        if (!up.key.participant) return conn.sendteks(m.chat, text(q.faddlink), d.f1("Notifikasi Update Group", ""), { 
          mentions: await conn.ments(text(q.faddlink))
        })
        if (!up.key.participant && m.isOwn) return conn.sendteks(m.chat, text(q.fownerjoin), d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text(q.fownerjoin))
        })
        conn.sendteks(m.chat, text(q.faddadmin), d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text(q.faddadmin))
        })
        break
      }

      // KICK
      case 28: {
        if (messageStubParams.includes(bot)) return
        let chat = cache.get(m.chat)
        for (let i of messageStubParams) {
          if (i == bot) {
            console.log(`Bot Has kicked in chat: ${m.chat}\nMetadata in chat: ${m.chat} has deleted!!!`)
            continue
          }
          chat.size -= 1
          let b = chat.participants.findIndex((v) => v.id == i)
          chat.participants.splice(b, 1)
        }
        cache.set(m.chat, chat)
        console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
        if (!db.grup[g][1].detect) return
        let text = q.fkick.replace("@admin", "@" + senderParticipant.split("@")[0]).replace("@user", messageStubParams.map((v) => `@${v.split("@")[0]}`).join(", "))
        conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text)
        })
        break
      }

      // PROMOTE
      case 29: {
        let chat = cache.get(m.chat)
        for (let i of messageStubParams) {
          let b = chat.participants.findIndex((v) => v.id == i)
          chat.participants.splice(b, 1)
          chat.participants.push({ id: i, admin: "admin" })
        }
        cache.set(m.chat, chat)
        console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
        if (!db.grup[g][1].detect) return
        let text = q.fpm.replace("@admin", "@" + senderParticipant.split("@")[0]).replace("@user", messageStubParams.map((v) => `@${v.split("@")[0]}`).join(", "))
        conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text)
        })
        break
      }

      // DEMOTE
      case 30: {
        let chat = cache.get(m.chat)
        for (let i of messageStubParams) {
          let b = chat.participants.findIndex((v) => v.id == i)
          chat.participants.splice(b, 1)
          chat.participants.push({ id: i, admin: null })
        }
        cache.set(m.chat, chat)
        console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
        if (!db.grup[g][1].detect) return
        let text = q.fdm.replace("@admin", "@" + senderParticipant.split("@")[0]).replace("@user", messageStubParams.map((v) => `@${v.split("@")[0]}`).join(", "))
        conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text)
        })
        break
      }

      // LEAVE
      case 32: {
        if (messageStubParams.includes(bot)) return
        let chat = cache.get(m.chat)
        for (let i of messageStubParams) {
          if (i == bot) continue
          let b = chat.participants.findIndex((v) => v.id == i)
          chat.participants.splice(b, 1)
          chat.size -= 1
        }
        cache.set(m.chat, chat)
        console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
        if (!db.grup[g][1].detect) return
        let text = q.fout.replace("@admin", "@" + senderParticipant.split("@")[0]).replace("@user", messageStubParams.map((v) => `@${v.split("@")[0]}`).join(", "))
        conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text)
        })
        break
      }

      // ADD INVITE
      case 71: {
        let chat = cache.get(m.chat)
        chat.participants.push({ id: messageStubParams.join(), admin: null })
        chat.size += 1
        cache.set(m.chat, chat)
        console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
        if (!db.grup[g][1].detect) return
        let text = q.faddinv.replace("@admin", "@" + senderParticipant.split("@")[0]).replace("@user", messageStubParams.map((v) => `@${v.split("@")[0]}`).join(", "))
        conn.sendteks(m.chat, text, d.f1("Notifikasi Update Group", ""), {
          mentions: await conn.ments(text)
        })
        break
      }
      
      // akhir
      default: {
        let stephe = m.msg?.ephemeralExpiration
        const p = (parse) => parse.replace("@jmlh", (stephe == 7776000 ? "90 Hari" : stephe == 604800 ? "7 Hari" : stephe == 86400 ? "24 Jam" : "") || "")
        if (/protocolMessage/.test(m.mtype) && stephe && m.msg.type == 3) {
          let chat = cache.get(m.chat)
          chat.ephemeralDuration = stephe
          cache.set(m.chat, chat)
          console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
          if (!db.grup[g][1].detect) return
          conn.sendteks(m.chat, p(r(q.fephe)), m)
        } else if (/protocolMessage/.test(m.mtype) && !m.msg?.ephemeralExpiration && m.msg?.type == 3) {
          let chat = cache.get(m.chat)
          chat.ephemeralDuration = undefined
          cache.set(m.chat, chat)
          console.log(`Menyingkronkan ulang metadata pada chat: ${m.chat}`)
          if (!db.grup[g][1].detect) return
          conn.sendteks(m.chat, r(q.fofephe), m)
        }
        break
      }
    }
  } else {
    switch (up.messageStubType) {
      case 40: {
        let teks = `User : @${up.key.remoteJid.split("@")[0]}\nBaru Saja Menelpon\nMatikan Notif Ini Di /Setting Jika Ini Mengganggu`
        conn.sendteks(q.developer[0] + q.idwa, teks, d.f1("Notifikasi Telepon", ""), {
          mentions: await conn.ments(teks)
        })
        break
      }

      case 41: {
        let teks = `User : @${up.key.remoteJid.split("@")[0]}\nBaru Saja Video Call\nMatikan Notif Ini Di /Setting Jika Ini Mengganggu`
        conn.sendteks(q.developer[0] + q.idwa, teks, d.f1("Notifikasi Telepon", ""), {
          mentions: await conn.ments(teks)
        })
        break
      }
    }
  }
}

export default groupsUpdateHandler