const { app, BrowserWindow, screen } = require('electron');
try {
  require('electron-reloader')(module);
} catch (_) {}
const fs = require('fs');
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client('77684239-5a07-4ea4-bc9c-2f07db9fddb7');
const filePath = 'C:/Users/Coach/AppData/Roaming/.minecraft/logs/blclient/minecraft/latest.log';
const keyword = 'ONLINE: ';
let lastTrimmed = '';
console.clear();
let win;
 
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
        
    });

    win.loadFile('playerstats.html');
}

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
app.on('ready', async () => {
  let i = 0;
  const checkForUpdates = () => {
    fs.promises.readFile(filePath, 'utf8')
      .then(data => {
        if (data.includes(keyword)) {
          const index = data.lastIndexOf(keyword);
          const line = data.substring(index);
          const parts = line.split('\n');
          const trimmed = parts[0].trim();
  
          if (trimmed !== lastTrimmed) {
            win.webContents.executeJavaScript(`clearTable()`)
            const names = trimmed.split(', ');
            names.forEach(async name => {
              const playerName = name.replace(keyword, '');
              try {
                const player = await hypixel.getPlayer(playerName);
                const winstreak = player.stats.bedwars.winstreak || '?';
                const finalKills = player.stats.bedwars.finalKills;
                const fkdr = player.stats.bedwars.finalKDRatio;
                const wins = player.stats.bedwars.wins;
                const lvl = player.stats.bedwars.level;
                const rank = player.rank;
              
                // Create new table row and cells for each iteration of the loop
                win.webContents.executeJavaScript(`
                var row = document.createElement("tr");
                var IGN = document.createElement("td");
                var wins = document.createElement("td");
                var finalKills = document.createElement("td");
                var fkdr = document.createElement("td");
                IGN.innerHTML = "(${lvl}) ${rank} ${player}";
                wins.innerHTML = "${wins}";
                finalKills.innerHTML = "${finalKills}";
                fkdr.innerHTML = "${fkdr}";
                row.appendChild(IGN);
                row.appendChild(wins);
                row.appendChild(finalKills);
                row.appendChild(fkdr);
                document.getElementById("table").appendChild(row);
                `);
                
                console.log(i);
                i++;
                console.log(`(${lvl})${rank}${playerName}: ws - ${winstreak} fkdr - ${fkdr} finals - ${finalKills} wins - ${wins}`);
              } catch (err) {
                console.error(`${playerName} Is Nicked`);
                i++;
              }
            });
            if (trimmed !== lastTrimmed) {
              i = 0;
            }
            lastTrimmed = trimmed;
          }
        }
      })
      .catch(console.error);
  };

  setInterval(checkForUpdates, 1000);
});

async function getPlayerStats(event) {
  event.preventDefault();
  const inputValue = document.getElementById("searchBar").value;
  try {
    const player = await hypixel.getPlayer(inputValue);
    const winstreak = player.stats.bedwars.winstreak || '?';
    const finalKills = player.stats.bedwars.finalKills;
    const fkdr = player.stats.bedwars.finalKDRatio;
    const wins = player.stats.bedwars.wins;
    const lvl = player.stats.bedwars.level;
    const rank = player.rank;
  
    // Create new table row and cells for each iteration of the loop
    win.webContents.executeJavaScript(`
    var row = document.createElement("tr");
    var IGN = document.createElement("td");
    var wins = document.createElement("td");
    var finalKills = document.createElement("td");
    var fkdr = document.createElement("td");
    IGN.innerHTML = "(${lvl}) ${rank} ${player}";
    wins.innerHTML = "${wins}";
    finalKills.innerHTML = "${finalKills}";
    fkdr.innerHTML = "${fkdr}";
    row.appendChild(IGN);
    row.appendChild(wins);
    row.appendChild(finalKills);
    row.appendChild(fkdr);
    document.getElementById("table").appendChild(row);
    `);
    
  } catch (err) {
    alert(err);
  }

}