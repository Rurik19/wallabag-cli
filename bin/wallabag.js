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
const valid_url_1 = require("valid-url");
const Vorpal = require("vorpal");
const vorpalLog = require("vorpal-log");
const colors = require("colors/safe");
const fs = require("fs");
const api = new wallabag_api_1.WallabagApi();
const vorpal = new Vorpal();
const recodeObj = {
    Url: "url",
    ApiVersion: "version",
    ClientId: "clientId",
    ClientSecret: "clientSecret",
    ApiToken: "applicationToken",
    RefreshToken: "refreshToken",
    ExpireDateMs: "expireDate"
};
const defaultFileName = 'wallabag.json';
vorpal
    .use(vorpalLog)
    .delimiter(colors.blue('wallabag$'))
    .history('wallabag-cli');
const logger = vorpal.logger;
vorpal
    .command('info', 'shows wallabag api data')
    .alias('i')
    .action((args, callback) => {
    showInfo();
    callback();
});
vorpal
    .command('url [url]', 'show or set wallabag URL ')
    .alias('u')
    .validate((args) => {
    if ((args.url === undefined) || valid_url_1.isWebUri(args.url)) {
        return true;
    }
    else {
        return colors.red(`url ${args.url} is incorrect`);
    }
})
    .action((args, callback) => {
    api.set({ url: args.url });
    logger.log(`${colors.green('url')} ${' '.repeat(20 - 'url'.length)} ${api.get().url}`);
    callback();
});
vorpal
    .command('version [url]', 'get api version')
    .alias('v')
    .validate((args) => {
    const checkurl = (args.url !== undefined) ? args.url : (api.get().url !== null) ? api.get().url : '';
    if ((checkurl === '')) {
        return 'empty url';
    }
    if (!valid_url_1.isWebUri(checkurl)) {
        return colors.red(`incorrect URL: ${checkurl} `);
    }
    return true;
})
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    const checkurl = (args.url !== undefined) ? args.url : (api.get().url !== null) ? api.get().url : '';
    return yield api.getApiVersion(checkurl).then((v) => { logger.info(v); });
}));
vorpal
    .command('load [file]', 'load wallabag setup from file. default filename is "wallabag.json"')
    .alias('l')
    .validate((args) => {
    const errorMessage = colors.red(`bad file ${args.file}`);
    const filename = args.file || defaultFileName;
    try {
        const stat = fs.statSync(filename);
        if (stat.isFile()) {
            return true;
        }
        else {
            return errorMessage;
        }
    }
    catch (e) {
        return errorMessage;
    }
})
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    return yield loadDataFromFile(args.file || defaultFileName)
        .then((data) => {
        const ldata = Object.assign({}, wallabag_api_1.defaultData);
        for (const key of Object.keys(data)) {
            if (key in ldata) {
                ldata[key] = data[key];
            }
            else {
                if (key in recodeObj) {
                    ldata[recodeObj[key]] = data[key];
                }
            }
        }
        api.set(ldata);
        showInfo();
    });
}));
if (process.argv.slice(2).length > 0) {
    try {
        vorpal.parse(process.argv);
    }
    catch (e) {
        process.exit(1);
    }
}
else {
    vorpal.show();
}
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
const showInfo = () => {
    const info = api.get();
    for (const key of Object.keys(info)) {
        let showData = info[key];
        if (((key === "expireDate") || (key === "refreshExpireDate")) && (info[key] !== null)) {
            const date = new Date(info[key]);
            showData = `${date.toDateString()} ${date.toTimeString()}`;
        }
        logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${showData}`);
    }
};
