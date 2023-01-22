const fs = require('fs');
const prompt = require('prompt-sync')();
const Hypixel = require('hypixel-api-reborn');

const hypixel = new Hypixel.Client('enterapihere');

const filePath = 'C:/Users/Coach/AppData/Roaming/.minecraft/logs/blclient/minecraft/latest.log';
const keyword = 'ONLINE: ';
let lastTrimmed = '';
console.clear();
console.log(` _______  _______  _______  ___            _______  __   __  _______ 
|       ||       ||   _   ||   |          |       ||  |_|  ||       |
|       ||   _   ||  |_|  ||   |          |    ___||       ||    ___|
|       ||  | |  ||       ||   |          |   |___ |       ||   |___ 
|      _||  |_|  ||       ||   |___  ___  |    ___| |     | |    ___|
|     |_ |       ||   _   ||       ||   | |   |___ |   _   ||   |___ 
|_______||_______||__| |__||_______||___| |_______||__| |__||_______|                                    
`);
console.log(`Created By 2emk7`);


const checkForUpdates = () => {
  fs.promises.readFile(filePath, 'utf8')
    .then(data => {
    
      if (data.includes(keyword)) {
        const index = data.lastIndexOf(keyword);
        const line = data.substring(index);
        const parts = line.split('\n');
        const trimmed = parts[0].trim();

        if (trimmed !== lastTrimmed) {
          console.clear();
          console.log(` _______  _______  _______  ___            _______  __   __  _______ 
|       ||       ||   _   ||   |          |       ||  |_|  ||       |
|       ||   _   ||  |_|  ||   |          |    ___||       ||    ___|
|       ||  | |  ||       ||   |          |   |___ |       ||   |___ 
|      _||  |_|  ||       ||   |___  ___  |    ___| |     | |    ___|
|     |_ |       ||   _   ||       ||   | |   |___ |   _   ||   |___ 
|_______||_______||__| |__||_______||___| |_______||__| |__||_______|                                    
`);
          const names = trimmed.split(', ');
          names.forEach(async name => {
            const playerName = name.replace(keyword, '');
            try {
              const player = await hypixel.getPlayer(playerName);
              const winstreak = player.stats.bedwars.winstreak || '?';
              const finalKills = player.stats.bedwars.finalKills;
              const fkdr = player.stats.bedwars.finalKDRatio;
              let wins = player.stats.bedwars.wins;
              let color;
              let color2;

      
          if (fkdr > 50) {
            color = '\x1b[95m'; //Pink
        } else if (fkdr > 20) {
        color = '\x1b[35m'; // Purple
        } else if (fkdr > 10) {
        color = '\x1b[34m'; // Blue
        } else if (fkdr > 8) {
        color = '\x1b[36m'; // Cyan
        } else if (fkdr > 6) {
        color = '\x1b[31m'; // Red
        } else if (fkdr > 4) {
        color = '\x1b[32m'; // Green
        } else if (fkdr > 2) {
        color = '\x1b[33m'; // Yellow
        } else {
        color = '\x1b[0m'; // Default (no color)
        }
  
        if (wins > 15000) {
          color2 = '\x1b[95m'; // Pink
        } else if (wins > 10000) {
          color2 = '\x1b[35m'; // Purple
        } else if (wins > 8000) {
          color2 = '\x1b[34m'; // Blue
        } else if (wins > 6000) {
          color2 = '\x1b[36m'; // Cyan
        } else if (wins > 4000) {
          color2 = '\x1b[31m'; // Red
        } else if (wins > 2000) {
          color2 = '\x1b[32m'; // Green
        } else if (wins > 1000) {
          color2 = '\x1b[33m'; // Yellow
        } else {
          color2 = '\x1b[0m'; // Default (no color)
        }
        
        
        console.log(`${color}${playerName}: ws - ${winstreak} fkdr - ${fkdr} finals - ${finalKills} wins - ${color2}${wins}`);
          } catch (err) {
            console.error(`${playerName} Is Nicked`);
          }
        });
        lastTrimmed = trimmed;
      }
    }
  })
  .catch(console.error);
};

setInterval(checkForUpdates, 1000);
