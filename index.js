const electron = require('electron');
const app = electron.app;
const browerWindow = electron.BrowserWindow;
let mainWindow = null;
app.on('ready', () => {
  mainWindow = new browerWindow({
    width: 800,
    height: 800
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
})