console.clear();
const puppeteer = require('puppeteer');
const fs = require('fs');
const prompt = require('prompt-sync')();

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

function runCode() {

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
      console.log(values);
      
          const url = 'https://bwstats.shivam.pro/user/' + values;
      
          try {
            await scrapeProduct(('https://bwstats.shivam.pro/user/' + values));
          } catch {
            console.log('This player has never played bedwars');
            console.log("---------------------------------------------");
          }
      async function scrapeProduct(url) {
         
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto(url);
      
          const [el2] = await page.$x('/html/body/div/main/div[1]/div[2]/p[1]');
          const txt2 = await el2.getProperty('textContent');
          const lvl = await txt2.jsonValue();
      
          const [el] = await page.$x('/html/body/div/main/div[1]/div[2]/p[3]');
          const txt = await el.getProperty('textContent');
          const fkdr = await txt.jsonValue();
      
          const [el1] = await page.$x('/html/body/div/main/div[1]/div[2]/p[4]');
          const txt1 = await el1.getProperty('textContent');
          const BBLR = await txt1.jsonValue();
      
          const [el3] = await page.$x('/html/body/div/main/div[1]/div[2]/div/table/tbody/tr[4]/td[2]');
          const txt3 = await el3.getProperty('textContent');
          const wlr = await txt3.jsonValue();
      
      
          console.log(lvl);
          console.log(fkdr);
          console.log(BBLR);
          console.log("Win/Loss Ratio (WLR): " + wlr);
          console.log("---------------------------------------------");
      
      }
    }
    console.log("-----------------------------------------------------------------------------------------------------------------------");
    }
  
});

}
const q = prompt("ask?");
if (q =="rr") {
  return;
}
