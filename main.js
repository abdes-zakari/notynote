const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

// var knex = require('knex')({
// 	client: 'sqlite3',
// 	connection: {
// 	  filename: "./data.db"
// 	},
//     useNullAsDefault: true
//  });


// let server=require('../server/server2.js');

process.env.NODE_ENV='production';
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({frame: true, width: 1000, height: 700, minWidth: 1000, minHeight: 700/*,maxWidth:1000,maxHeight:700 */})
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
   // mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    // mainWindow.loadURL(`file:///C:/laragon/www/Electron/electron-react/build/index.html`);
  mainWindow.on('closed', () => mainWindow = null);
  // mainWindow.minimize();
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('test-data',function(event,arg){
    console.log('das ist :'+arg);
});

ipcMain.on('OnSaveNote',function(event,arg){
  // console.log('das ist :'+arg);
  mainWindow.webContents.send("resultFromDB",arg);
  // let inserted=knex('notes').insert({note_body: arg});
  // inserted.then(function(){
    
  //    let res=knex.select('*').from('notes');
  //    res.then(function(rows){
  //      mainWindow.webContents.send("resultFromDB",rows);
  //    })

  // })

});

var testVar="Holaaaaaaaaaaaaaa";
ipcMain.on('getAllNotes',function(event){
     //  let result=knex.select('*').from('notes');
     //  console.log('CALL data');
     //  result.then(function(rows){
     //    mainWindow.webContents.send("allNotes",rows);
     // })
});
