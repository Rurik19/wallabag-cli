"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallabag_api_1 = require("wallabag-api");
const wallabag_1 = require("../wallabag");
const info_1 = require("./info");
const fs = require("fs");
const constants_1 = require("../constants");
(v => v
    .command('load', 'load wallabag setup from file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-s, --silent', 'don\'t show options after load')
    .alias('l')
    .validate(args => checkFile(args.options.file || constants_1.defaultFileName))
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    const rawData = yield loadDataFromFile(args.options.file || constants_1.defaultFileName);
    const normData = normalizeData(rawData);
    wallabag_1.api.set(normData);
    wallabag_1.vorpal.localStorage.setItem('lastSetup', JSON.stringify(normData));
    if (!args.options.silent) {
        info_1.showInfo();
    }
})))(wallabag_1.vorpal);
const checkFile = (fileName) => {
    const errorMessage = `bad file ${fileName}`;
    try {
        const stat = fs.statSync(fileName);
        if (stat.isFile()) {
            return true;
        }
        else {
            wallabag_1.logger.error(errorMessage);
        }
    }
    catch (e) {
        wallabag_1.logger.error(errorMessage);
    }
    return false;
};
const normalizeData = (data) => {
    const ldata = Object.assign({}, wallabag_api_1.defaultData);
    for (const key of Object.keys(data)) {
        if (key in ldata) {
            ldata[key] = data[key];
        }
        else {
            if (key in constants_1.recodeObj) {
                ldata[constants_1.recodeObj[key]] = data[key];
            }
        }
    }
    return ldata;
};
const loadDataFromFile = (file) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
});
