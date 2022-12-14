console.clear();
const puppeteer = require('puppeteer');
const fs = require('fs');
const prompt = require('prompt-sync')();
const Hypixel = require("hypixel-api-reborn")
const hypixel = new Hypixel.Client('API HERE');


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
          console.log('\x1b[36m', values,'\x1b[0m' + "  LVL - " + player.stats.bedwars.level + "   FKDR - " + player.stats.bedwars.finalKDRatio + "   WINS - " + player.stats.bedwars.wins)
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
