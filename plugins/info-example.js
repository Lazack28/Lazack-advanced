let handler = async (m, { conn, Func, usedPrefix, command, text }) => {
    try {
      if (!text) {
        if (m.isGroup) {
          let response = '*Please choose from the list.*\n\n'
          response += `*${usedPrefix + command} 1*\n`
          response += '_Example code for Plugin Event 1_\n\n'
          response += `*${usedPrefix + command} 2*\n`
          response += '_Example code for Plugin Event 2_\n\n'
          response += `*${usedPrefix + command} 3*\n`
          response += '_Example code for Plugin Event 3_\n\n'
          response += global.set.footer 
          return m.reply(response)
        } else {
          const sections = [
            {
              title: "Please choose",
              rows: [
                {
                  title: "Example 1",
                  rowId: `${usedPrefix + command} 1`,
                  description: "Example code for Plugin Event 1"
                },
                {
                  title: "Example 2",
                  rowId: `${usedPrefix + command} 2`,
                  description: "Example code for Plugin Event 2"
                },
                {
                  title: "Example 3",
                  rowId: `${usedPrefix + command} 3`,
                  description: "Example code for Plugin Event 3"
                }
              ]
            },
            {
              title: "Donation",
              rows: [
                {
                  title: "Donate Now",
                  rowId: "donation",
                  description: "Help us with a donation"
                },
                {
                  title: "About Us",
                  rowId: "about",
                  description: "Information about the developers"
                }
              ]
            }
          ]
  
          const listMessage = {
            text: "Please choose one of the examples below:",
            title: "Code Examples",
            buttonText: "Touch me >//<",
            sections
          }
  
          return await conn.sendMessage(m.chat, listMessage, { quoted: m })
        }
      }
  
      const responseMap = {
        '1': `*Plugin Event 1*\n\n\`\`\`javascript\nlet handler = async (m, { conn }) => {\n  try {\n    // Example 1 code goes here...\n  } catch (e) {\n    console.log(e)\n    return conn.reply(m.chat, Func.jsonFormat(e), m)\n  }\n}\nhandler.help = ['help_command']\nhandler.tags = ['tags_command']\nhandler.command = /^(command_regex)$/i // you can also use handler.command = ['command']\nlimit = true\n\nmodule.exports = handler\n\`\`\``,
        '2': `*Plugin Event 2*\n\n\`\`\`javascript\nmodule.exports = {\n  run: async (m, { conn }) => {\n    try {\n      // Example 2 code goes here...\n    } catch (e) {\n      console.log(e)\n      return conn.reply(m.chat, Func.jsonFormat(e), m)\n    }\n  },\n  help: ['help_command'],\n  tags: ['tags_command'],\n  command: /^(command)$/i,\n  limit: true\n}\n\`\`\``,
        '3': `*Plugin Event 3*\n\n\`\`\`javascript\nmodule.exports = Object.assign(async function handler(m, { conn }) {\n  try {\n    // Example 3 code goes here...\n  } catch (e) {\n    console.log(e)\n    return conn.reply(m.chat, Func.jsonFormat(e), m)\n  }\n}, {\n  help: ['help_command'],\n  tags: ['tags_command'],\n  command: ['command'],\n  limit: true\n})\n\`\`\``
      }
  
      if (responseMap[text.toLowerCase()]) {
        return conn.reply(m.chat, responseMap[text.toLowerCase()], m)
      }
  
      return conn.reply(m.chat, 'Invalid choice. Type the command without options to see the menu.', m)
    } catch (e) {
      console.log(e)
      return conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  }
  handler.help = ['example']
  handler.tags = ['info']
  handler.command = /^(example|ex)$/i
  
  module.exports = handler