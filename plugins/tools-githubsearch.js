let handler = async (m, { text, Func }) => {
  if (!text) return m.reply('What are you searching for?') // Prompt for search text if not provided
  m.react('🕒') // React with a clock emoji
  try {
    // Fetch repositories from GitHub API based on the search query
    let json = await Func.fetchJson(global.API('https://api.github.com', '/search/repositories', { q: text }))
    if (!json || !json.items) return m.reply('No repositories found') // Check if any repositories were returned

    let strArray = [] // Initialize an array to hold results
    strArray.push('乂  *G I T H U B  S E A R C H*') // Add "GitHub Search" at the beginning

    // Loop through each repository and format the details
    json.items.forEach((repo, index) => {
      strArray.push(`*${1 + index}.* *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
_${repo.html_url}_
_Created on *${formatDate(repo.created_at)}*_
_Last updated on *${formatDate(repo.updated_at)}*_
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
${repo.open_issues} Issue${repo.description ? `
*Description:*\n${repo.description}` : ''}
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\``.trim())
    })

    let str = strArray.join('\n\n') // Join array elements into a single string
    m.reply(str) // Send the formatted string as a reply
  } catch (e) {
   return m.reply(global.status.error) // Handle errors gracefully
  }
}

handler.help = ['githubsearch'].map(v => v + ' <search term>') // Help command format
handler.tags = ['tools'] // Tag for the command
handler.command = /^g(ithub|h)search$/i // Command regex

module.exports = handler // Export the handler

function formatDate(n, locale = 'en') { // Function to format dates
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