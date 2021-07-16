const { remote } = require('electron');
const BrowserWindow = remote.BrowserWindow;
const fs = require('fs');
const path = require('path')
window.addEventListener('DOMContentLoaded', () => {
  let btn = document.querySelector('#btn')
  let fileContent = document.querySelector('#file-content')
  let btnCreate = document.querySelector('#btn-create')
  btn.addEventListener('click', () => {
    console.log('被点击了');
    fs.readFile(path.join(__dirname, 'package.json'), (err, data) => {
      if (!err) {
        console.log(data);
        fileContent.innerHTML = data;
      } else {
        console.log(err);
      }
    })
  })

  // 默认情况下,数据/元素不能在其他元素中被拖放。对于drop我们必须防止元素的默认处理
  fileContent.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
  fileContent.addEventListener('drop', (e) => {
    // console.log(e);
    // console.log(e.dataTransfer.files[0]);

    fs.readFile(e.dataTransfer.files[0].path, (err, data) => {
      if (!err) {
        fileContent.innerHTML = data
      } else {
        console.log(err);
      }
    })
  })
  let mainWindow = null;
  const createBrowser = () => {
    mainWindow = new BrowserWindow({
      width: 400,
      height: 400,
      webPreferences: {
        nodeIntegration: true,   // node集成
        contextIsolation: false, // 环境孤立
        enableRemoteModule: true  // 是否可以启用remote模块
      }
    });
    mainWindow.loadFile(path.join(__dirname, 'news.html'));
    mainWindow.on('closed', () => {
      mainWindow = null;
    })
  }

  // 创建一个新页面
  btnCreate.addEventListener('click', () => {
    createBrowser()
  })
})