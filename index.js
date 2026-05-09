// ====================================================
//         𝑺𝒂𝒆𝒆𝒅 𝑩𝒐𝒕 🛡️ - الملف الرئيسي
//   بوت واتساب يمني متكامل بأكثر من 600 أمر
//   المطور والمالك : 967770179625
// ====================================================

// ====================================================
//   𝑺𝒂𝒆𝒆𝒅 𝑩𝒐𝒕 🛡️ - ربط عبر رقم الهاتف
// ====================================================

const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys');
const pino = require('pino');

async function startSaeedBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        auth: state,
        version,
        logger: pino({ level: 'silent' }),
        browser: Browsers.macOS('Desktop'),
        syncFullHistory: false
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', ({ connection }) => {
        if (connection === 'open') {
            console.log('✅ البوت جاهز تماماً!');
        } else if (connection === 'close') {
            setTimeout(startSaeedBot, 5000); // إعادة محاولة بعد 5 ثوانٍ إذا انقطع الاتصال
        }
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        // تجاهل رسائل القنوات لتجنب الانهيار
        if (msg.key.remoteJid.includes('@newsletter')) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
        
        // الرد فقط على كلمة .فحص
        if (text === '.فحص') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'البوت شغال يا سعيد! ✅' });
        }
    });
}
startSaeedBot();
