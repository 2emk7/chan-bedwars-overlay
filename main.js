const fs = require('fs');
const prompt = require('prompt-sync')();
const Hypixel = require('hypixel-api-reborn');

const hypixel = new Hypixel.Client('77684239-5a07-4ea4-bc9c-2f07db9fddb7');

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
              const fkdr = player.stats.bedwars.finalKDRatio;
              let color;
      
          if (fkdr > 50) {
            color = '\x1b[95m'; // Pink
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


          let wins = player.stats.bedwars.wins;
          let color2;

          if (wins > 15000) {
            color2 = '\x1b[95m'; // Pink
          } else if (wins > 10000) {
            color2 = '\x1b[35m'; // Purple
          } else if (wins > 8000) {
            color2 = '\x1b[34m'; // Blue
          } else if (wins >6000) {
            color2 = '\x1b[36m'; // Cyan
          } else if (wins > 4000) {
            color2 = '\x1b[31m'; // Red
          } else if (wins > 1500) {
            color2 = '\x1b[32m'; // Green
          } else if (wins > 500) {
            color2 = '\x1b[33m'; // Yellow
          } else {
            color2 = '\x1b[0m'; // Default (no color)
          }
      
          let lvl = player.stats.bedwars.level;

          
          console.log('\x1b[0m', playerName + '\x1b[0m' +"  LVL - " + lvl + '\x1b[0m' +"  WS - " + player.stats.bedwars.winstreak + '\x1b[0m' +"   FKDR - " + color, fkdr + '\x1b[0m' +"   WINS - " + color2, player.stats.bedwars.wins)
          console.log('\x1b[0m' + "---------------------------------------")
          } catch (err) {
            var nick = playerName;
            console.log(`${nick} is nicked`);
            console.log('\x1b[0m' + "---------------------------------------")
          }
        }
          )
        lastTrimmed = trimmed;
      }
      
    }
    
  });
  
};

setInterval(checkForUpdates, 1000);
