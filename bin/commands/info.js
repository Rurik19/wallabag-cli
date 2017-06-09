"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallabag_1 = require("../wallabag");
const colors = require("colors/safe");
(v => v.command('info', 'shows wallabag api data')
    .alias('i')
    .action((args, callback) => {
    exports.showInfo();
    callback();
}))(wallabag_1.vorpal);
exports.showInfo = (prop) => {
    const info = wallabag_1.api.get();
    for (const key of Object.keys(info)) {
        let showData = info[key];
        if (((key === "expireDate") || (key === "refreshExpireDate")) && (info[key] !== null)) {
            const date = new Date(info[key]);
            showData = `${date.toDateString()} ${date.toTimeString()}`;
        }
        if (key === prop) {
            wallabag_1.logger.log(`${colors.yellow(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        }
        else {
            wallabag_1.logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        }
    }
};
