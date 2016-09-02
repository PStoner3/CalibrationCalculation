'use strict';

const fileUtils = require('./lib/utils/fileUtils');
const appConfig = require('./config/appConfig');
// const connection = require('lib/modules/connection');
// const keybindings = require('lib/modules/keybindings');
// const themes = require('lib/modules/themes');

class Calibration {
    constructor() {}

    init() {
        createAppConfigDir();
    }
}

function createAppConfigDir() {
    fileUtils.createDirSync(appConfig.appConfigDir);
}

module.exports = new Calibration();