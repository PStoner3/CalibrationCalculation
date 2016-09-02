'use strict'

const { app, BrowserWindow, crashReporter, ipcMain: ipc } = require('electron')
const path = require('path');

require('../calibration').init();

const appConfig = require('../config/appConfig');

let mainWindow = null;

ipc.on('set-title', (event, title) => {
    mainWindow.setTitle(title || appconfig.name);
})

ipc.on('quit', () => {
    app.quit();
})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

    // Create the browser window.
    mainWindow = new BrowserWindow({ center: true });

    mainWindow.maximize();

    mainWindow.setMinimumSize(770, 400);

    mainWindow.loadURL(path.join(`file://${__dirname}`, '../ui/index.html'));

    mainWindow.on('close', () => {
        app.quit();
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});