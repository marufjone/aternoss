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
        port: 40788, // Sizning aniq portingiz qaytarildi
        username: 'AFK_Bot_Uz', 
        version: '1.21.1',
        connectTimeout: 60000, // Ulanishni kutish vaqti 1 daqiqaga uzaytirildi
        keepAlive: true // Tarmoq qotib qolishini oldini olish yoqildi
    });

    bot.on('spawn', () => {
        console.log('Bot muvaffaqiyatli kirdi va AFK rejimida!');
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

    bot.on('end', () => {
        console.log('Bot o\'chdi, 5 soniyadan keyin qayta ulanadi...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => {
        console.log('Xatolik yuz berdi, lekin bot to\'xtamaydi:', err.message);
    });
}

createBot();
