/** 
  * code by Im-Dims istri mari mwah 
  * yang hapus wm yatim
**/

const nodemailer = require('nodemailer');
const { createHash } = require('crypto');

let registrasiEmail = {};
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender];
  let name = await conn.getName(m.sender);
  let lerr = 'Congratulations on getting:\n+100 Limit\n+10.000 Balance\n+10.000 XP\n+10.000 Money';
  let sn = createHash('md5').update(m.sender).digest('hex');
  switch (command) {
    case 'regmail':
      if (!user.registered) {
        if (!text) return conn.reply(m.sender, `Enter Emai's Addressl!\n\nContoh: *${usedPrefix + command} xxx@gmail.com*`, m);
        m.react('🕒');
        m.reply(`The code has been sent via email, Please check your email, if there is a code then copy and type *${usedPrefix}vercode the code you copied*`)
        const email = text.trim();
        user.email = email
        const kodenya = await generateVerificationCode();

        registrasiEmail[m.sender] = kodenya;

        await sendVerificationEmail({
          penerima: email,
          title: 'LAZACK ADVANCED',
          content: 'Thank you for registering with LAZACK. Please use the verification code below to complete your registration:',
          kodeVerifikasi: kodenya.code,
          wm: 'LAZACK28',
          expiryMessage: 'This verification code will expire in 5 minutes.',
          ignoreMessage: 'If you did not request this verification, please ignore this email.'
        });
      } else {
        conn.reply(m.chat, `You have been registered before.`, m);
      }
      break;
    case 'vercode':
      if (!text) return conn.reply(m.chat, `Enter the verification code that has been sent to your email.`, m);
      m.react('🕒');
      const kodeOtp = text.trim();
      const kodeEmail = registrasiEmail[m.sender];
      if (!kodeEmail) return conn.reply(m.chat, `You haven't asked for a verification code yet. Please register first with the command ${usedPrefix}regmail.`, m);
      if (kodeEmail.code === kodeOtp) {
        if (Date.now() > kodeEmail.expiresAt) {
          delete registrasiEmail[m.sender];
          return conn.reply(m.chat, `Verification code is incorrect. Please double-check or resend the verification code with the command ${usedPrefix}regmail.`, m);
        }

        delete registrasiEmail[m.sender];
        
        user.registered = true;
        user.balance += 10000;
        user.money += 10000;
        user.limit += 100;
        conn.reply(m.chat, `Successful registration!

╭─「 Info User 」
│ Nama: ${name}
│ Code: ${kodeOtp}
│ SN: ${sn}
╰────

*If your SN forgot to type ${usedPrefix}ceksn*

${lerr}`, m);
      } else {
        conn.reply(m.chat, `'Verification code is incorrect. Please double-check or resend the verification code with the command ${usedPrefix}regmail.`, m);
      }
      break;
  }
};

handler.command = handler.help = ['regmail', 'vercode'];
handler.tags = ['user'];
handler.limit = 1;

module.exports = handler;

async function generateVerificationCode() {
  const length = 6;
  const characters = '0123456789';
  let verificationCode = '';
  for (let i = 0; i < length; i++) {
    verificationCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const expirationTime = Date.now() + 5 * 60 * 1000;

  return { 
    code: verificationCode, 
    expiresAt: expirationTime 
  };
}

async function sendVerificationEmail({ penerima, title, content, kodeVerifikasi, wm, expiryMessage, ignoreMessage }) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ada.otp.woi@gmail.com',
      pass: 'lter aomi cczu mkjs', // Ensure this is correct and not exposed in production
    },
  });

  const emailHTML = `
  <div style="font-family: 'Roboto', sans-serif; background: linear-gradient(135deg, #3a7bd5, #00d2ff); padding: 30px; max-width: 600px; margin: auto; border-radius: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1)">
    <div style="background: #ffffff; border-radius: 12px; overflow: hidden">
        
        <!-- Bagian Gambar GIF -->
        <div style="padding: 20px; text-align: center;">
            <img src="https://i.pinimg.com/originals/9e/b6/45/9eb64510150a5eaa7bc6e89e366508e7.gif" alt="GIF Image" style="width: 100%; border-radius: 12px;">
            <p style="font-size: 24px; color: #333333; margin-top: 15px; font-weight: bold;">Verifikasi dua langkah</p>
        </div>
        
        <!-- Bagian Teks dan Konten -->
        <div style="padding: 40px 30px">
            <p style="font-size: 18px; color: #333333; margin-bottom: 15px">Dear ${penerima} !</p>
            <p style="font-size: 16px; color: #666666; margin-bottom: 30px">${content}</p>
            <div style="background-color: #3a7bd5; color: #ffffff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 8px">
                ${kodeVerifikasi}
            </div>
            <p style="font-size: 14px; color: #999999; margin-top: 20px">${expiryMessage}</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0">
            <p style="font-size: 14px; color: #999999">${ignoreMessage}</p>
            <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 30px">
                <a href="https://www.youtube.com/@lazaromtaju" style="color: #3a7bd5; text-decoration: none; font-weight: 600">2023 © ${wm}</a>
            </p>
        </div>
    </div>
</div>
`;

  const mailOptions = {
    from: `"Verifikasi Account" <lazacklazaro7@gmail.com>`,
    to: penerima,
    subject: title,
    html: emailHTML,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email from lazack organisation:', info.response);
  } catch (error) {
    console.log('error to verify email:', error);
  }
}