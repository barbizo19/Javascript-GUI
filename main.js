//ipcMain allows main.js to work with stuff entered in front end
const { app, BrowserWindow, ipcMain } = require("electron");

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true, //we can access to node function and node APIS
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.loadFile("index.html"); //load html into the window
};

app.whenReady().then(createWindow); //only create the window when everything is ready. we do this because when you laod an application a lot of other stuff happens so we want to wait to load the window

ipcMain.on("generatePassword", (event, data) => {
  const randomPassword = data + Math.random().toString(36).substr(2, 5);
  win.webContents.send("receivePassword", randomPassword); //sends the random password to an event in render called receivePassword that's listening for ipcMain.on
}); //when someone does something in the render or main.js, 'generatePassword' event will run, with the callback function. the data argument is the data from render.js which will contain the keywork we passed in the input
