const fs = require('fs');
const path = require('path')
window.addEventListener('DOMContentLoaded', () => {
  let btn = document.querySelector('#btn')
  let fileContent = document.querySelector('#file-content')
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
})