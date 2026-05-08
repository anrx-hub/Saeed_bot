// ====================================================
//         𝑺𝒂𝒆𝒆𝒅 𝑩𝒐𝒕 🛡️ - الملف الرئيسي
//   بوت واتساب يمني متكامل بأكثر من 600 أمر
//   المطور والمالك : 967770179625
// ====================================================

// ====================================================
//   𝑺𝒂𝒆𝒆𝒅 𝑩𝒐𝒕 🛡️ - ربط عبر رقم الهاتف
// ====================================================

const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

async function startSaeedBot() {
    const sessionFolder = './session';
    if (!fs.existsSync(sessionFolder)) fs.mkdirSync(sessionFolder);

    // تحويل السر (Secret) من GitHub إلى ملف creds.json حقيقي
    const sessionData = process.env.SESSION_ID;
    if (sessionData) {
        fs.writeFileSync(path.join(sessionFolder, 'creds.json'), sessionData);
    }

    const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Saeed Bot", "Chrome", "1.0.0"]
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', ({ connection }) => {
        if (connection === 'open') console.log('🚀 مبروك يا سعيد! البوت متصل الآن وشغال.');
        if (connection === 'close') startSaeedBot();
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
        if (msg.message.conversation === '.فحص') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'البوت شغال يا بطل! ✅' });
        }
    });
}
startSaeedBot();
