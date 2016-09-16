'use strict';

const exec = require('child_process').exec

const logger = require('./lib/modules/logger');
const fileUtils = require('./lib/utils/fileUtils');
const appConfig = require('./config/appConfig');

let child;
let taskList = [];


class Calibration {
    constructor() {}

    init() {
        createAppConfigDir();
        createAppDataDir();
        startMongo();
        getTaskList();
    }

    shutdown() {
        shutdownMongo();
    }
}

function createAppConfigDir() {
    fileUtils.createDirSync(appConfig.appConfigDir);
}

function createAppDataDir() {
    fileUtils.createDirSync(appConfig.dbConfigPath);
}

function createDataFile() {
    fileUtils.createFileSync(appConfig.dataFilePath);
}

function startMongo() {
    child = exec(`mongod --dbpath ${appConfig.dbConfigPath}`);
}

function getTaskList() {
    let pgm = 'mongod';

    exec('tasklist', function(err, stdout, stderr) {
        var lines = stdout.toString().split('\n');
        var results = new Array();
        lines.forEach(function(line) {
            var parts = line.split('=');
            parts.forEach(function(items) {
                if (items.toString().indexOf(pgm) > -1) {
                    taskList.push(items.toString().replace(/\s+/g, '|').split('|')[1])
                }
            });
        });
    });
}

function shutdownMongo() {
    var pgm = 'mongod';

    console.log('inside shutdownMongo');

    try {
        taskList.forEach(function(item) {
            console.log('Killing process ' + item);
            process.kill(item);
        });
    } catch (e) {
        logger.warn(e);
    }
}

module.exports = new Calibration();