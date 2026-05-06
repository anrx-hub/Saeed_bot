// ====================================================
//   𝑺𝒂𝒆𝒆𝒅 𝑩𝒐𝒕 🛡️ - أوامر الترفيه والألعاب (يمني)
// ====================================================

const commands = {};
function addCmd(names, config) { names.forEach(name => { commands[name] = config; }); }

// ===== 1. لعبة حجر ورقة مقص =====
addCmd(['حجر_ورقة_مقص', 'rps'], {
  execute: async (ctx) => {
    const { sock, chatId, message, body } = ctx;
    const choices = ['حجر', 'ورقة', 'مقص'];
    if (!body || !choices.includes(body)) {
      return sock.sendMessage(chatId, { text: '📌 اختار: حجر، ورقة، أو مقص\nمثال: .rps حجر' }, { quoted: message });
    }
    
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';
    
    if (body === botChoice) result = 'تعادل يا صاحبي! 🤝';
    else if (
      (body === 'حجر' && botChoice === 'مقص') ||
      (body === 'ورقة' && botChoice === 'حجر') ||
      (body === 'مقص' && botChoice === 'ورقة')
    ) result = 'فزت يا بطل! 🎉';
    else result = 'فزت عليك أنا! 😂✌️';
    
    await sock.sendMessage(chatId, { text: `أنت اخترت: ${body}\nأنا اخترت: ${botChoice}\n\nالنتيجة: ${result}` }, { quoted: message });
  }
});

// ===== 2. نسبة الحب =====
addCmd(['نسبة_الحب', 'حب', 'love'], {
  execute: async (ctx) => {
    const { sock, chatId, message, body, targetJid } = ctx;
    if (!targetJid && !body) return sock.sendMessage(chatId, { text: '📌 منشن شخص أو اكتب اسمه عشان نشوف نسبة الحب.' }, { quoted: message });
    
    const percent = Math.floor(Math.random() * 101);
    let comment = '';
    if (percent > 90) comment = 'حب أسطوري ياخي! ❤️🔥';
    else if (percent > 70) comment = 'علاقة رائعة! 💕';
    else if (percent > 50) comment = 'فيه أمل إن شاء الله! 💛';
    else if (percent > 30) comment = 'مجرد أصدقاء والله! 🤝';
    else comment = 'اهرب يا معلم! ما لك عندهم خير 💔🏃‍♂️';
    
    await sock.sendMessage(chatId, { text: `💖 نسبة الحب هي: *${percent}%*\n\nالخلاصة: ${comment}` }, { quoted: message });
  }
});

// ===== 3. نكتة عشوائية (يمنية) =====
addCmd(['نكتة', 'نكت', 'joke'], {
  execute: async (ctx) => {
    const { sock, chatId, message } = ctx;
    const jokes = [
      '😂 مرة واحد يمني راح البحر قال له الحوت: وش جابك هنا؟ قال: جيت أتفرج عليك يا حوت!',
      '😂 مرة واحد قال لصاحبه: وين رايح؟ قال: رايح أتعلم سباحة! قال: بس البحر بعيد! قال: حسّن النية وعوّض الله!',
      '😂 واحد غبي سألوه: منو أعظم إنسان في العالم؟ قال: خالي! قالوا: ليش؟ قال: لأنه يضحكني كل يوم!',
      '😂 مرة واحد بخيل اشترى آلة حاسبة شال منها زرار الناقص عشان يخزن فلوسه.',
      '😂 نملة سألوها: ليش ماتت يوم فرحك؟ قالت: العروس داست علي بالغلط وهي ترقص!',
      '😂 مرة واحد قال لأبوه: أبي أتزوج! قاله: أولاً تتعلم الصبر! قاله: طيب أبي أتزوج صبورة!',
      '😂 واحد ضارب ولده قاله: ليش ضربتني؟ قاله: عشان ما تكبر وتصير زيي!'
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await sock.sendMessage(chatId, { text: `${joke}` }, { quoted: message });
  }
});

module.exports = { commands };
