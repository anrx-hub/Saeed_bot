// ====================================================
//         𝑺𝒂𝒆𝒆𝒅 𝑩𝒐𝒕 🛡️ - الملف الرئيسي
//   بوت واتساب يمني متكامل بأكثر من 600 أمر
//   المطور والمالك : 967770179625
// ====================================================

// ====================================================
//   𝑺𝒂𝒆𝒆𝒅 𝑩𝒐𝒕 🛡️ - ربط عبر رقم الهاتف
// ====================================================

const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Pastebin } = require('pastebin-js'); // أو الطريقة اللي استخرجت بها السشن

async function startSaeedBot() {
    // هنا الكود سيبحث عن SESSION_ID في إعدادات GitHub
    const sessionID = process.env.SESSION_ID; 

    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Saeed_Bot", "Chrome", "1.0.0"]
    });

    // إذا كان السشن موجود، سيتصل مباشرة
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'open') {
            console.log('🚀 مبروك يا سعيد! البوت متصل الآن باستخدام الـ Session.');
        } else if (connection === 'close') {
            startSaeedBot();
        }
    });

    // أوامر البوت
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        if (text === '.قائمة') {
            await sock.sendMessage(from, { text: '🌟 أهلاً سعيد! البوت شغال بالـ Session ID بنجاح.' });
        }
    });
}

startSaeedBot();
