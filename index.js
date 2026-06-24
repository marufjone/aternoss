const mineflayer = require('mineflayer');
const express = require('express'); // 24/7 ishlash uchun qo'shildi
const app = express();

// UptimeRobot ushbu manzilga bog'lanib botni uyg'oq tutadi
app.get('/', (req, res) => {
    res.send('Bot 24/7 rejimda faol!');
});
app.listen(3000, () => console.log('Veb-server 3000 portda tayyor.'));

function createBot() {
    const bot = mineflayer.createBot({
        host: 'silienceworldmcorg.aternos.me', 
        port: 40788, 
        username: 'AFK', 
        version: '1.21.1' 
    });

    bot.on('spawn', () => {
        console.log('Bot muvaffaqiyatli kirdi va AFK rejimida!');
        // Har 10 soniyada sakrab turish funksiyasi
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
