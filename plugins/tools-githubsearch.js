let handler = async (m, { text, Func }) => {
  if (!text) return m.reply('Cari apa?')
  m.react('🕒')
  try {
    let json = await Func.fetchJson(global.API('https://api.github.com', '/search/repositories', { q: text }))
    if (!json || !json.items) return m.reply('Tidak dapat menemukan repositori')
    let strArray = [] // Inisialisasi array untuk menampung hasil
    strArray.push('乂  *G I T H U B  S E A R C H*') // Menambahkan "Github Search" di awal
    json.items.forEach((repo, index) => {
      strArray.push(`*${1 + index}.* *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
_${repo.html_url}_
_Dibuat pada *${formatDate(repo.created_at)}*_
_Terakhir update pada *${formatDate(repo.updated_at)}*_
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
${repo.open_issues} Issue${repo.description ? `
*Deskripsi:*\n${repo.description}` : ''}
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\``.trim())
    })
    let str = strArray.join('\n\n') // Gabungkan elemen array menjadi satu string
    m.reply(str)
  } catch (e) {
   return m.reply(global.status.error)
  }
}
handler.help = ['githubsearch'].map(v => v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^g(ithub|h)search$/i

module.exports = handler

function formatDate(n, locale = 'id') {
  let d = new Date(n)
    return d.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
   })
}
