const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// UptimeRobot va Render botni o'chib qolmasligi uchun veb-server
app.get('/', (req, res) => {
    res.send('Bot 24/7 rejimda faol!');
});
app.listen(3000, () => console.log('Veb-server 3000 portda tayyor.'));

function createBot() {
    const bot = mineflayer.createBot({
        host: 'silienceworldmcorg.aternos.me', 
        port: 40788, 
        username: 'AFK_Bot_Uz', 
        version: '1.21.1' 
    });

    bot.on('spawn', () => {
        console.log('Bot muvaffaqiyatli kirdi va AFK rejimida!');
        
        // Har 5 soniyada (5000 ms) bajariladigan harakatlar
        setInterval(() => {
            if (!bot || !bot.entity) return;

            // 1. Sakrash harakati
            bot.setControlState('jump', true);
            setTimeout(() => {
                if (bot && bot.entity) bot.setControlState('jump', false);
            }, 300);

            // 2. Tasodifiy tomonga qimirlash (yurish)
            const directions = ['forward', 'back', 'left', 'right'];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            
            bot.setControlState(randomDirection, true);
            setTimeout(() => {
                if (bot && bot.entity) bot.setControlState(randomDirection, false);
            }, 400); // 0.4 soniya davomida yuradi va to'xtaydi

            // 3. Atrofga qarash (Sichqonchani qimirlatgandek effekt)
            const yaw = (Math.random() - 0.5) * 2 * Math.PI;
            const pitch = (Math.random() - 0.5) * Math.PI / 2;
            bot.look(yaw, pitch, true);

        }, 5000);
    });

    bot.on('end', () => {
        console.log('Bot o\'chdi, 5 soniyadan keyin qayta ulanadi...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log('Xatolik yuz berdi:', err));
}

createBot();
