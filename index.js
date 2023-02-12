const { app, BrowserWindow, screen } = require('electron');
const fs = require('fs');
const Hypixel = require('hypixel-api-reborn');
const hypixel = new Hypixel.Client('77684239-5a07-4ea4-bc9c-2f07db9fddb7');
const filePath = 'C:/Users/Coach/AppData/Roaming/.minecraft/logs/blclient/minecraft/latest.log';
const keyword = 'ONLINE: ';
const keyword2 = '. FINAL KILL!';
const keyword3 = 'has invited you to join their party!';
const keyword4 = ' has joined';
const keyword5 = ' has quit!';
let lastTrimmed = '';
console.clear();
let win;
function createWindow() {
    win = new BrowserWindow({
      backgroundcolor: (36, 35, 35, 0.658),
        width: 800,
        height: 600,
        frame: false,
        transparent:true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
        
    });

    win.loadFile('playerstats.html');
        win.webContents.setMaxListeners(100);
        win.webContents.executeJavaScript(`clearTable()`)


}

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


var lastsecond;
var last4;
var last5;

app.on('ready', async () => {
  const checkForUpdates = () => {

    fs.promises.readFile(filePath, 'utf8').then(async data => {
      const lines5 = data.split('\n');
      let lineWithKeyword5 = '';
      lines5.forEach(liner => {
      if (liner.includes(keyword5)) {
      lineWithKeyword5 = liner;
      }
      });
      if (lineWithKeyword5) {
      let line5 = lineWithKeyword5;
      line5 = line5.substring(0, line5.indexOf(keyword5));
      let words5 = line5.split(' ');
      let five = words5[words5.length - 1];
      if (five !== last5) {
      playerName5 = five;
      try{
      win.webContents.executeJavaScript(`
      var table = document.getElementById("table");
       for (var p = 0, row; row = table.rows[p]; p++) {
         if (row.id == "${playerName5}") {
           table.deleteRow(p); break; 
          } 
        }`);
      }catch(error){

      }
    }last5 = playerName5;
      }
      });

    fs.promises.readFile(filePath, 'utf8').then(async data => {
      const lines = data.split('\n');
      let lineWithKeyword4 = '';
      lines.forEach(line => {
      if (line.includes(keyword4)) {
      lineWithKeyword4 = line;
      }
      });
      if (lineWithKeyword4) {
      let line4 = lineWithKeyword4;
      line4 = line4.substring(0, line4.indexOf(keyword4));
      let words4 = line4.split(' ');
      let four = words4[words4.length - 1];
      if (four !== last4) {
      playerName = four;
      try{
        const player = await hypixel.getPlayer(playerName);
        const ws = player.stats.bedwars.winstreak || '?';
        const finalKills = player.stats.bedwars.finalKills;
        const fkdr = player.stats.bedwars.finalKDRatio;
        const wins = player.stats.bedwars.wins;
        const lvl = player.stats.bedwars.level;
        const rank = player.rank;
        const wlr = player.stats.bedwars.WLRatio;
        const playerUUID = player.uuid;
        const crafatarURL = `https://crafatar.com/avatars/${playerUUID}`;
        last4 = playerName;
        let clr;
        if (lvl < 100) {
            clr = "#AAAAAA";
        } else if (lvl < 200) {
            clr = "#FFFFFF";
        } else if (lvl < 300) {
            clr = "#FFD700";
        }
        else if (lvl < 400) {
        clr = "#55FFFF";
        }
        else if (lvl < 500) {
          clr = "#00AA00";
        }
        else if (lvl < 600) {
          clr = "#00AAAA";
        }
        else if (lvl < 700) {
          clr = "#AA0000";
        }
        else if (lvl < 800) {
          clr = "#FF55FF";
        }
        else if (lvl < 900) {
          clr = "#5555FF";
        }
        else if (lvl < 1000) {
          clr = "#AA00AA";
        }
        else{
          clr = "#0000FF";
        }
        
      let wsclr;
    if (ws === "?"){
        wsclr = '#FFFFFF';}
    else if (ws < 4){
       wsclr = '#AAAAAA';}
    else if (ws < 10){
       wsclr = '#FFFFFF';}//100 stars
    else if (ws < 25){
       wsclr = '#FFAA00';}//200 stars
    else if (ws < 50){
       wsclr = '#00AAAA';}//500 stars
    else if (ws < 100){
       wsclr = '#AA0000';}//600 stars
    else{
       wsclr = '#AA00AA';//900 star
    }

    let fkdrclr;

        if (fkdr < 1){
          fkdrclr = '#AAAAAA';}
    else if (fkdr < 3){
      fkdrclr = '#FFFFFF';}//100 stars
    else if (fkdr < 5){
      fkdrclr = '#FFAA00';}//200 stars
    else if (fkdr < 10){
      fkdrclr = '#00AAAA';}//500 stars
    else if (fkdr < 25){
      fkdrclr = '#AA0000';}//600 stars
    else{
      fkdrclr = '#AA00AA';//900 star
    }

    let finalsclr;

        if (finalKills < 1000){
          finalsclr = '#AAAAAA';}
    else if (finalKills < 5000){
      finalsclr = '#FFFFFF';}//100 stars
    else if (finalKills < 10000){
      finalsclr = '#FFAA00';}//200 stars
    else if (finalKills < 15000){
      finalsclr = '#00AAAA';}//500 stars
    else if (finalKills < 20000){
      finalsclr = '#AA0000';}//600 stars
    else{
      finalsclr = '#AA00AA';//900 star
    }

    let winsclr;

        if (wins < 500){
          winsclr = '#AAAAAA';}
    else if (wins < 1000){
      winsclr = '#FFFFFF';}//100 stars
    else if (wins < 2000){
      winsclr = '#FFAA00';}//200 stars
    else if (wins < 5000){
      winsclr = '#00AAAA';}//500 stars
    else if (wins < 10000){
      winsclr = '#AA0000';}//600 stars
    else{
      winsclr = '#AA00AA';//900 star
    }

    let wlrclr;

        if (wlr < 1){
          wlrclr = '#AAAAAA';}
    else if (wlr < 2){
      wlrclr = '#FFFFFF';}//100 stars
    else if (wlr < 5){
      wlrclr = '#FFAA00';}//200 stars
    else if (wlr < 7){
      wlrclr = '#00AAAA';}//500 stars
    else if (wlr < 10){
      wlrclr = '#AA0000';}//600 stars
    else{
      wlrclr = '#AA00AA';//900 star
    }


        win.webContents.executeJavaScript(`
        var row = document.createElement("tr");
        row.id = "${player}";
        var lvl = document.createElement("td");
        lvl.style.color = "${clr}";
        var IGN = document.createElement("td");
        var wins = document.createElement("td");
        wins.style.color = "${winsclr}";
        var finals = document.createElement("td");
        finals.style.color = "${finalsclr}";
        var fkdr = document.createElement("td");
        fkdr.style.color = "${fkdrclr}";
        var wlr = document.createElement("td");
        wlr.style.color = "${wlrclr}";
        var ws  =document.createElement("td");
        ws.style.color = "${wsclr}";
        var av = document.createElement("td");
        var face = document.createElement("img");
        face.src = "${crafatarURL}";
        face.style.width = "15px";
        face.style.height = "15px";

        

      lvl.innerHTML = "(${lvl})";
      IGN.innerHTML = "<span class='${rank.toLowerCase()}'>${player}</span>";
      ws.innerHTML = "${ws}";
      fkdr.innerHTML = "${fkdr}";
      wlr.innerHTML = "${wlr}";
      finals.innerHTML = "${finalKills}";
      wins.innerHTML = "${wins}";

      av.appendChild(face);
      row.appendChild(av);

      row.appendChild(lvl);
      row.appendChild(IGN);
      row.appendChild(ws);
      row.appendChild(fkdr);
      row.appendChild(wlr);
      row.appendChild(finals);
      row.appendChild(wins);
        
        
        document.getElementById("table").appendChild(row);
        
        `);
      
          win.webContents.executeJavaScript(`IGN.innerHTML = "<span class='player-name ${rank.toLowerCase()}' title='${playerName}'>${playerName}</span>";`);
         
      } catch (error) {
        last4 = playerName;
      }
      
    }
    else{
        
    }
      }
      });

    fs.promises.readFile(filePath, 'utf8').then(async data => {
      const lines = data.split('\n');
      let lineWithKeyword3 = '';
      lines.forEach(line => {
      if (line.includes(keyword3)) {
      lineWithKeyword3 = line;
      }
      });
      if (lineWithKeyword3) {
      let line3 = lineWithKeyword3;
      line3 = line3.substring(0, line3.indexOf(keyword3));
      let words = line3.split(' ');
      let secondToLastWord = words[words.length-2];
      if (secondToLastWord !== lastsecond) {
      playerName = secondToLastWord
      try{
        const player = await hypixel.getPlayer(playerName);
        const ws = player.stats.bedwars.winstreak || '?';
        const finalKills = player.stats.bedwars.finalKills;
        const fkdr = player.stats.bedwars.finalKDRatio;
        const wins = player.stats.bedwars.wins;
        const lvl = player.stats.bedwars.level;
        const rank = player.rank;
        const wlr = player.stats.bedwars.WLRatio;
        const playerUUID = player.uuid;
        const crafatarURL = `https://crafatar.com/avatars/${playerUUID}`;

        let clr;
        if (lvl < 100) {
            clr = "#AAAAAA";
        } else if (lvl < 200) {
            clr = "#FFFFFF";
        } else if (lvl < 300) {
            clr = "#FFD700";
        }
        else if (lvl < 400) {
        clr = "#55FFFF";
        }
        else if (lvl < 500) {
          clr = "#00AA00";
        }
        else if (lvl < 600) {
          clr = "#00AAAA";
        }
        else if (lvl < 700) {
          clr = "#AA0000";
        }
        else if (lvl < 800) {
          clr = "#FF55FF";
        }
        else if (lvl < 900) {
          clr = "#5555FF";
        }
        else if (lvl < 1000) {
          clr = "#AA00AA";
        }
        else{
          clr = "#0000FF";
        }
        
      let wsclr;
    if (ws === "?"){
        wsclr = '#FFFFFF';}
    else if (ws < 4){
       wsclr = '#AAAAAA';}
    else if (ws < 10){
       wsclr = '#FFFFFF';}//100 stars
    else if (ws < 25){
       wsclr = '#FFAA00';}//200 stars
    else if (ws < 50){
       wsclr = '#00AAAA';}//500 stars
    else if (ws < 100){
       wsclr = '#AA0000';}//600 stars
    else{
       wsclr = '#AA00AA';//900 star
    }

    let fkdrclr;

        if (fkdr < 1){
          fkdrclr = '#AAAAAA';}
    else if (fkdr < 3){
      fkdrclr = '#FFFFFF';}//100 stars
    else if (fkdr < 5){
      fkdrclr = '#FFAA00';}//200 stars
    else if (fkdr < 10){
      fkdrclr = '#00AAAA';}//500 stars
    else if (fkdr < 25){
      fkdrclr = '#AA0000';}//600 stars
    else{
      fkdrclr = '#AA00AA';//900 star
    }

    let finalsclr;

        if (finalKills < 1000){
          finalsclr = '#AAAAAA';}
    else if (finalKills < 5000){
      finalsclr = '#FFFFFF';}//100 stars
    else if (finalKills < 10000){
      finalsclr = '#FFAA00';}//200 stars
    else if (finalKills < 15000){
      finalsclr = '#00AAAA';}//500 stars
    else if (finalKills < 20000){
      finalsclr = '#AA0000';}//600 stars
    else{
      finalsclr = '#AA00AA';//900 star
    }

    let winsclr;

        if (wins < 500){
          winsclr = '#AAAAAA';}
    else if (wins < 1000){
      winsclr = '#FFFFFF';}//100 stars
    else if (wins < 2000){
      winsclr = '#FFAA00';}//200 stars
    else if (wins < 5000){
      winsclr = '#00AAAA';}//500 stars
    else if (wins < 10000){
      winsclr = '#AA0000';}//600 stars
    else{
      winsclr = '#AA00AA';//900 star
    }

    let wlrclr;

        if (wlr < 1){
          wlrclr = '#AAAAAA';}
    else if (wlr < 2){
      wlrclr = '#FFFFFF';}//100 stars
    else if (wlr < 5){
      wlrclr = '#FFAA00';}//200 stars
    else if (wlr < 7){
      wlrclr = '#00AAAA';}//500 stars
    else if (wlr < 10){
      wlrclr = '#AA0000';}//600 stars
    else{
      wlrclr = '#AA00AA';//900 star
    }


        win.webContents.executeJavaScript(`
        var row = document.createElement("tr");
        row.id = "${player}";
        var lvl = document.createElement("td");
        lvl.style.color = "${clr}";
        var IGN = document.createElement("td");
        var wins = document.createElement("td");
        wins.style.color = "${winsclr}";
        var finals = document.createElement("td");
        finals.style.color = "${finalsclr}";
        var fkdr = document.createElement("td");
        fkdr.style.color = "${fkdrclr}";
        var wlr = document.createElement("td");
        wlr.style.color = "${wlrclr}";
        var ws  =document.createElement("td");
        ws.style.color = "${wsclr}";
        var av = document.createElement("td");
        var face = document.createElement("img");
        face.src = "${crafatarURL}";
        face.style.width = "15px";
        face.style.height = "15px";

        

      lvl.innerHTML = "(${lvl})";
      IGN.innerHTML = "<span class='${rank.toLowerCase()}'>${player}</span>";
      ws.innerHTML = "${ws}";
      fkdr.innerHTML = "${fkdr}";
      wlr.innerHTML = "${wlr}";
      finals.innerHTML = "${finalKills}";
      wins.innerHTML = "${wins}";

      av.appendChild(face);
      row.appendChild(av);

      row.appendChild(lvl);
      row.appendChild(IGN);
      row.appendChild(ws);
      row.appendChild(fkdr);
      row.appendChild(wlr);
      row.appendChild(finals);
      row.appendChild(wins);
                
                
                document.getElementById("table").appendChild(row);
                
                `);
                try{
                  win.webContents.executeJavaScript(`IGN.innerHTML = "<span class='player-name ${rank.toLowerCase()}' title='${playerName}'>${playerName}</span>";`);
                  }catch(err){
                    console.log( "AAAA" - err)
                  }
}catch(error){
}
      }
      lastsecond = secondToLastWord;
} 
});


    fs.promises.readFile(filePath, 'utf8').then(data => {
      const lines = data.split('\n');
      let lineWithKeyword2 = '';
      lines.forEach(line => {
        if (line.includes(keyword2)) {
          lineWithKeyword2 = line;
        }
      });
      if (lineWithKeyword2) {
        let line2 = lineWithKeyword2;
        line2 = line2.substring(line2.indexOf('[CHAT]') + '[CHAT]'.length);
        let firstWord = line2.split(' ')[0];
        while (firstWord === ':' || firstWord === '') {
          line2 = line2.substring(line2.indexOf(' ') + 1);
          firstWord = line2.split(' ')[0];
        }
        if (firstWord) {
          win.webContents.executeJavaScript(`
          var table = document.getElementById("table");
           for (var i = 0, row; row = table.rows[i]; i++) {
             if (row.id == "${firstWord}") {
               table.deleteRow(i); break; 
              } 
            }`);
          }
      
      }
    });


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
              sendStats()
              async function sendStats(){
                try{
                  const player = await hypixel.getPlayer(playerName);
                  const ws = player.stats.bedwars.winstreak || '?';
                  const finalKills = player.stats.bedwars.finalKills;
                  const fkdr = player.stats.bedwars.finalKDRatio;
                  const wins = player.stats.bedwars.wins;
                  const lvl = player.stats.bedwars.level;
                  const rank = player.rank;
                  const wlr = player.stats.bedwars.WLRatio;
                  const playerUUID = player.uuid;
                  const crafatarURL = `https://crafatar.com/avatars/${playerUUID}`;
          
                  let clr;
                  if (lvl < 100) {
                      clr = "#AAAAAA";
                  } else if (lvl < 200) {
                      clr = "#FFFFFF";
                  } else if (lvl < 300) {
                      clr = "#FFD700";
                  }
                  else if (lvl < 400) {
                  clr = "#55FFFF";
                  }
                  else if (lvl < 500) {
                    clr = "#00AA00";
                  }
                  else if (lvl < 600) {
                    clr = "#00AAAA";
                  }
                  else if (lvl < 700) {
                    clr = "#AA0000";
                  }
                  else if (lvl < 800) {
                    clr = "#FF55FF";
                  }
                  else if (lvl < 900) {
                    clr = "#5555FF";
                  }
                  else if (lvl < 1000) {
                    clr = "#AA00AA";
                  }
                  else{
                    clr = "#0000FF";
                  }
                  
                let wsclr;
              if (ws === "?"){
                  wsclr = '#FFFFFF';}
              else if (ws < 4){
                 wsclr = '#AAAAAA';}
              else if (ws < 10){
                 wsclr = '#FFFFFF';}//100 stars
              else if (ws < 25){
                 wsclr = '#FFAA00';}//200 stars
              else if (ws < 50){
                 wsclr = '#00AAAA';}//500 stars
              else if (ws < 100){
                 wsclr = '#AA0000';}//600 stars
              else{
                 wsclr = '#AA00AA';//900 star
              }
          
              let fkdrclr;
          
                  if (fkdr < 1){
                    fkdrclr = '#AAAAAA';}
              else if (fkdr < 3){
                fkdrclr = '#FFFFFF';}//100 stars
              else if (fkdr < 5){
                fkdrclr = '#FFAA00';}//200 stars
              else if (fkdr < 10){
                fkdrclr = '#00AAAA';}//500 stars
              else if (fkdr < 25){
                fkdrclr = '#AA0000';}//600 stars
              else{
                fkdrclr = '#AA00AA';//900 star
              }
          
              let finalsclr;
          
                  if (finalKills < 1000){
                    finalsclr = '#AAAAAA';}
              else if (finalKills < 5000){
                finalsclr = '#FFFFFF';}//100 stars
              else if (finalKills < 10000){
                finalsclr = '#FFAA00';}//200 stars
              else if (finalKills < 15000){
                finalsclr = '#00AAAA';}//500 stars
              else if (finalKills < 20000){
                finalsclr = '#AA0000';}//600 stars
              else{
                finalsclr = '#AA00AA';//900 star
              }
          
              let winsclr;
          
                  if (wins < 500){
                    winsclr = '#AAAAAA';}
              else if (wins < 1000){
                winsclr = '#FFFFFF';}//100 stars
              else if (wins < 2000){
                winsclr = '#FFAA00';}//200 stars
              else if (wins < 5000){
                winsclr = '#00AAAA';}//500 stars
              else if (wins < 10000){
                winsclr = '#AA0000';}//600 stars
              else{
                winsclr = '#AA00AA';//900 star
              }
          
              let wlrclr;
          
                  if (wlr < 1){
                    wlrclr = '#AAAAAA';}
              else if (wlr < 2){
                wlrclr = '#FFFFFF';}//100 stars
              else if (wlr < 5){
                wlrclr = '#FFAA00';}//200 stars
              else if (wlr < 7){
                wlrclr = '#00AAAA';}//500 stars
              else if (wlr < 10){
                wlrclr = '#AA0000';}//600 stars
              else{
                wlrclr = '#AA00AA';//900 star
              }
          
          
                  win.webContents.executeJavaScript(`
                  var row = document.createElement("tr");
                  row.id = "${player}";
                  var lvl = document.createElement("td");
                  lvl.style.color = "${clr}";
                  var IGN = document.createElement("td");
                  var wins = document.createElement("td");
                  wins.style.color = "${winsclr}";
                  var finals = document.createElement("td");
                  finals.style.color = "${finalsclr}";
                  var fkdr = document.createElement("td");
                  fkdr.style.color = "${fkdrclr}";
                  var wlr = document.createElement("td");
                  wlr.style.color = "${wlrclr}";
                  var ws  =document.createElement("td");
                  ws.style.color = "${wsclr}";
                  var av = document.createElement("td");
                  var face = document.createElement("img");
                  face.src = "${crafatarURL}";
                  face.style.width = "15px";
                  face.style.height = "15px";

                  

                lvl.innerHTML = "(${lvl})";
                IGN.innerHTML = "<span class='${rank.toLowerCase()}'>${player}</span>";
                ws.innerHTML = "${ws}";
                fkdr.innerHTML = "${fkdr}";
                wlr.innerHTML = "${wlr}";
                finals.innerHTML = "${finalKills}";
                wins.innerHTML = "${wins}";

                av.appendChild(face);
                row.appendChild(av);

                row.appendChild(lvl);
                row.appendChild(IGN);
                row.appendChild(ws);
                row.appendChild(fkdr);
                row.appendChild(wlr);
                row.appendChild(finals);
                row.appendChild(wins);
                
                
                document.getElementById("table").appendChild(row);
                
                `);
            
                win.webContents.executeJavaScript(`IGN.innerHTML = "<span class='player-name ${rank.toLowerCase()}' title='${playerName}'>${playerName}</span>";`);
              
                console.log(`(${lvl})${rank}${playerName}: ws - ${ws} fkdr - ${fkdr} finals - ${finalKills} wins - ${wins}`);
              }catch (err) {
                console.error(`${playerName} Is Nicked`);
                win.webContents.executeJavaScript(`
                var row = document.createElement("tr");
                row.id = "${playerName}";
                var lvl = document.createElement("td");
                var IGN = document.createElement("td");
                IGN.style.color = '#FFFFFF';
                var wins = document.createElement("td");
                var finals = document.createElement("td");
                var fkdr = document.createElement("td");
                var wlr = document.createElement("td");
                var ws  =document.createElement("td");

                lvl.innerHTML = " ";
                IGN.innerHTML = "${playerName} is nicked";
                ws.innerHTML = " ";
                fkdr.innerHTML = " ";
                wlr.innerHTML = " ";
                finals.innerHTML = " ";
                wins.innerHTML = " ";
                
                row.appendChild(lvl);
                row.appendChild(IGN);
                row.appendChild(ws);
                row.appendChild(fkdr);
                row.appendChild(wlr);
                row.appendChild(finals);
                row.appendChild(wins);
                
                
                document.getElementById("table").appendChild(row);`)
              }
            }
            });
            if (trimmed !== lastTrimmed) {
            }
            lastTrimmed = trimmed;
          }
        }
      })

  };

  setInterval(checkForUpdates, 600);
});
