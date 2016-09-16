'use strict'

const { app, BrowserWindow, crashReporter, ipcMain: ipc } = require('electron');
const path = require('path');

const appCalibration = require('../calibration');
const appConfig = require('../config/appConfig');

const calculateResults = require('../lib/calculation/calculation');

appCalibration.init();

let mainWindow = null;

ipc.on('set-title', (event, title) => {
    mainWindow.setTitle(title || appconfig.name);
})

ipc.on('quit', () => {
    app.quit();
})

ipc.on('doCalc', (event, data) => {
    console.log('doCalc received ' + data);

    let results = calculateResults(data);
    mainWindow.send('calcResult', results)
});

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
    mainWindow = new BrowserWindow({
        center: true,
        width: 1260,
        height: 800,
        resizable: false,
        maximizable: false
    });

    // mainWindow.maximize();

    // mainWindow.setMinimumSize(770, 400);

    mainWindow.loadURL(path.join(`file://${__dirname}`, '../ui/index.html'));

    mainWindow.on('close', () => {
        appCalibration.shutdown();
    });

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});