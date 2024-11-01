module.exports = {
  run: async (m, { conn, env }) => {
    conn.sendContact(m.chat, [{
      name: env.owner_name,
      number: env.owner,
      about: 'Owner & Creator'
    }], m, {
      org: 'Mari Support',
      website: 'https://api.ssateam.my.id',
      email: 'dev@ssateam.my.id'
    })
  },
  help: ['owner'],
  tags: ['miscs'],
  command: /^(owner|creator)$/i
}