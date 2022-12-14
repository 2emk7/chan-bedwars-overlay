console.clear();
console.clear();
const puppeteer = require('puppeteer');
const fs = require('fs');
const prompt = require('prompt-sync')();
const Hypixel = require("hypixel-api-reborn")
const hypixel = new Hypixel.Client('APIHERE');


process.setMaxListeners(0);
console.log(`
 _______  _______  _______  ___            _______  __   __  _______ 
|       ||       ||   _   ||   |          |       ||  |_|  ||       |
|       ||   _   ||  |_|  ||   |          |    ___||       ||    ___|
|       ||  | |  ||       ||   |          |   |___ |       ||   |___ 
|      _||  |_|  ||       ||   |___  ___  |    ___| |     | |    ___|
|     |_ |       ||   _   ||       ||   | |   |___ |   _   ||   |___ 
|_______||_______||__| |__||_______||___| |_______||__| |__||_______|
                                     
`);

function runMe() {
  const age = prompt(' run? (Y/N) ');

  if(age == 'Y'){
    console.clear();
    console.log(`
 _______  _______  _______  ___            _______  __   __  _______ 
|       ||       ||   _   ||   |          |       ||  |_|  ||       |
|       ||   _   ||  |_|  ||   |          |    ___||       ||    ___|
|       ||  | |  ||       ||   |          |   |___ |       ||   |___ 
|      _||  |_|  ||       ||   |___  ___  |    ___| |     | |    ___|
|     |_ |       ||   _   ||       ||   | |   |___ |   _   ||   |___ 
|_______||_______||__| |__||_______||___| |_______||__| |__||_______|
                                     
`);
    run()
  }
  else{
    console.log("stop");
  }
}

async function run(){
fs.readFile('C:/Users/Coach/AppData/Roaming/.minecraft/logs/blclient/minecraft/latest.log', 'utf8', async (err, data) => {
  if (err) throw err;

  let index = data.lastIndexOf('ONLINE: ');

  if (index !== -1) {
    const endIndex = data.indexOf('\n', index);
  
    while (true) {
      const values = [];
  
      const commaIndex = data.indexOf(',', index);
      if (commaIndex === -1 || commaIndex > endIndex) {
        break;
      }
  
      let value = data.substring(index, commaIndex).trim();
      if (values.length === 0 && value.startsWith('ONLINE: ')) {
        value = value.substring('ONLINE: '.length);

      }
      values.push(value);
  
      index = commaIndex + 1;
      
      
      try {
        await hypixel.getPlayer(value).then(player => {
          let fkdr = player.stats.bedwars.finalKDRatio;
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
      
          console.log('\x1b[0m', values + '\x1b[0m' +"  LVL - " + player.stats.bedwars.level + '\x1b[0m' +"  WS - " + player.stats.bedwars.winstreak + '\x1b[0m' +"   FKDR - " + color, fkdr + '\x1b[0m' +"   WINS - " + color2, player.stats.bedwars.wins)
          console.log('\x1b[0m' + "---------------------------------------")
        });
      } catch {
        console.log('player has no bedwars stats');
      }
    
      }
    }  
    runMe()
})
}
runMe()
