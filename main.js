const { app, BrowserWindow } = require('electron');
const path = require('path')
let mainWindow = null;
const createBrowser = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true,   // node集成
      contextIsolation: false // 环境孤立
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}
// 监听页面加载完成，然后创建窗口
// app.on('ready', createBrowser)

app.whenReady().then(() => {
  createBrowser()
  // 当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。


  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createBrowser()
  })
})



app.on('window-all-closed', () => {
  // 如果不是macos平台，则退出应用
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
// 如果被选中激活，且窗口没有激活的窗口，则创建一个
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createBrowser()
//   }
// })