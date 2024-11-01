module.exports = {
  run: async (m, { conn, env }) => {
    conn.sendContact(m.chat, [{
      name: env.owner_name,
      number: env.owner,
      about: 'Owner & Creator'
    }], m, {
      org: 'lazackorganisition',
      website: 'lazackorganisation.us.kg',
      email: 'lazaromtaju12@gmail.com'
    })
  },
  help: ['owner'],
  tags: ['miscs'],
  command: /^(owner|creator)$/i
}