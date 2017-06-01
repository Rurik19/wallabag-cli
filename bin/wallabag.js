"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallabag_api_1 = require("wallabag-api");
const api = new wallabag_api_1.WallabagApi();
const Vorpal = require("vorpal");
const vorpalLog = require("vorpal-log");
const colors = require("colors/safe");
const vorpal = new Vorpal();
vorpal
    .use(vorpalLog)
    .delimiter(colors.white('wallabag$'))
    .show();
const logger = vorpal.logger;
logger.log('This is a wallabag cli program.');
vorpal
    .command('info', 'shows wallabag api data')
    .action((args, callback) => {
    const info = api.get();
    for (const key of Object.keys(info)) {
        logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${info[key]}`);
    }
    callback();
});
vorpal
    .command('url [url]', 'show or set wallabag URL ')
    .action((args, callback) => {
    if (args.url !== undefined) {
        api.set({ url: args.url });
    }
    logger.log(`${colors.green('url')} ${' '.repeat(20 - 'url'.length)} ${api.get().url}`);
    callback();
});
