const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'silienceworldmcorg.aternos.me', // Sizning serveringiz IP manzili
        port: 40788, 
        username: 'AFK_Bot_Uz2', // Bot o'yinga kiradigan ism
        version: '1.21.1' // Serveringiz mos keladigan versiya
    });

    bot.on('spawn', () => {
        console.log('Bot muvaffaqiyatli kirdi va AFK rejimida!');
        // Bot serverdan chiqib ketmasligi uchun har 10 soniyada sakrab turadi
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 10000);
    });

    bot.on('end', () => {
        console.log('Bot o\'chdi, 5 soniyadan keyin qayta ulanadi...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log('Xatolik yuz berdi:', err));
}

createBot();
