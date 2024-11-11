module.exports = {
  run: async (m, { conn, usedPrefix, command, text, Scraper, Func }) => {
    let chatId = m.chat;
    conn.math = conn.math ? conn.math : {};

    // Clear previous calculations if they exist
    if (chatId in conn.math) {
      clearTimeout(conn.math[chatId][3]);
      delete conn.math[chatId];
      m.reply('You should think for yourself instead of copying others.');
    }

    // Sanitize and format the input expression
    let sanitizedExpression = text
      .replace(/[^0-9\-\/+*×÷πEe()piPI]/g, '')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π|pi/gi, 'Math.PI')
      .replace(/e/gi, 'Math.E')
      .replace(/\/+/g, '/')
      .replace(/\++/g, '+')
      .replace(/-+/g, '-');

    let formattedExpression = sanitizedExpression
      .replace(/Math\.PI/g, 'π')
      .replace(/Math\.E/g, 'e')
      .replace(/\//g, '÷')
      .replace(/\*/g, '×');

    try {
      console.log(sanitizedExpression);
      let result = new Function('return ' + sanitizedExpression)();

      if (result === undefined) throw result;

      m.reply(`*${formattedExpression}* = _${result}_`);
    } catch (error) {
      if (error === undefined) {
        return m.reply(`What is the input?`);
      }
      return m.reply('Invalid format. Only numbers and symbols -, +, *, /, ×, ÷, π, e, (, ) are supported.');
    }
  },
  help: ['calc'],
  use: 'expression',
  tags: ['tools'],
  command: /^(calc(ulate|or)?|calculator)$/i,
  limit: true,
};