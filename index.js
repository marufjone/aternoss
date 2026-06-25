const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot 24/7 rejimda faol!');
});
app.listen(3000, () => console.log('Veb-server 3000 portda tayyor.'));

function createBot() {
    const bot = mineflayer.createBot({
        host: 'silienceworldmcorg.aternos.me', 
        port: 40788, 
        username: 'AFK_Bot_Uz', 
        version: '1.21.1',
        auth: 'offline', // Aternos-ga litsenziyasiz kirish rejimi
        hideErrors: false,
        checkTimeoutInterval: 90000, // Tarmoq uzilishini tekshirish intervalini uzaytirish
        connectTimeout: 90000, // Ulanishni kutish vaqtini maksimal qilish
        keepAlive: true // Doimiy aloqa paketlarini jo'natib turish
    });

    // Aternos tarmoq himoyasidan o'tish uchun ulanish paketlarini majburiy sozlash
    bot._client.on('connect', () => {
        console.log('Server eshigiga yetib bordi, paketlar yuborilmoqda...');
    });

    bot.on('spawn', () => {
        console.log('Bot muvaffaqiyatli kirdi va AFK rejimida!');
        
        // Har 5 soniyada sakrash va tasodifiy qimirlash
        setInterval(() => {
            if (!bot || !bot.entity) return;

            bot.setControlState('jump', true);
            setTimeout(() => {
                if (bot && bot.entity) bot.setControlState('jump', false);
            }, 300);

            const directions = ['forward', 'back', 'left', 'right'];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            
            bot.setControlState(randomDirection, true);
            setTimeout(() => {
                if (bot && bot.entity) bot.setControlState(randomDirection, false);
            }, 400);

            const yaw = (Math.random() - 0.5) * 2 * Math.PI;
            const pitch = (Math.random() - 0.5) * Math.PI / 2;
            bot.look(yaw, pitch, true);

        }, 5000);
    });

    bot.on('end', (reason) => {
        console.log('Ulanish uzildi, sabab:', reason);
        console.log('Bot 5 soniyadan keyin qayta ulanadi...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log('Tarmoq xatoligi yuz berdi:', err.message);
    });
}

createBot();
