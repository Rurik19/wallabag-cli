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
vorpal
    .use(vorpalLog)
    .delimiter(colors.blue('wallabag$'));
const logger = vorpal.logger;
vorpal
    .command('info', 'shows wallabag api data')
    .alias('i')
    .action((args, callback) => {
    const info = api.get();
    for (const key of Object.keys(info)) {
        logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${info[key]}`);
    }
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
    .command('load <file>', 'load wallabag setup from file')
    .alias('l')
    .validate((args) => {
    const errorMessage = colors.red(`bad file ${args.file}`);
    try {
        const stat = fs.statSync(args.file);
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
    return yield loadDataFromFile(args.file)
        .then((data) => {
        logger.log(JSON.stringify(data));
    })
        .then(() => vorpal.exec('info'));
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
