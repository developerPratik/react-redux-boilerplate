'use strict'

const webpackConfigs = require('./config');
const defaultConfig = 'dev';
const chalk = require('chalk').default;


module.exports = (configName) => {
    const requestedConfig = configName || defaultConfig;

    let LoadedConfig = webpackConfigs[defaultConfig];

    if (webpackConfigs[requestedConfig] !== undefined) {
        LoadedConfig = webpackConfigs[requestedConfig];
    }
    else {
        console.log(chalk.yellow(`Environment "${configName}" was not found.`));
        LoadedConfig = webpackConfigs[defaultConfig];
    }
    const loadedInstance = new LoadedConfig();

    process.env.NODE_ENV = loadedInstance.env;

    return loadedInstance.config;

}