import { WallabagApi, defaultData } from 'wallabag-api';
import { isWebUri } from 'valid-url';

import Vorpal = require('vorpal');
import vorpalLog = require('vorpal-log');
import colors = require('colors/safe');
import fs = require('fs');

const api = new WallabagApi();
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
        if ( (args.url === undefined) || isWebUri(args.url) ) {
            return true;
        } else {
            return colors.red(`url ${args.url} is incorrect`);
        }
    })
    .action((args, callback) => {
        api.set({ url: args.url});
        logger.log(`${colors.green('url')} ${' '.repeat(20 - 'url'.length)} ${api.get().url}`);
        callback();
    });

vorpal
    .command('version [url]', 'get api version')
    .alias('v')
    .validate((args) => {
        const checkurl = (args.url !== undefined) ? args.url : (api.get().url !== null) ? api.get().url : '';
        if ( (checkurl === '') ) { return 'empty url'; }
        if ( !isWebUri(checkurl) ) { return colors.red(`incorrect URL: ${checkurl} `); }
        return true;
    })
    .action(async (args, cb) => {
            const checkurl = (args.url !== undefined) ? args.url : (api.get().url !== null) ? api.get().url : '';
            return await api.getApiVersion(checkurl).then( (v) => { logger.info(v); });
    });

vorpal
    .command('load', 'load wallabag setup from file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-s, --silent', 'don\'t show options after load' )
    .alias('l')
    .validate( args => checkFile(args.options.filename || defaultFileName) )
    .action(async (args, cb) => {
        const rawData = await loadDataFromFile(args.options.filename || defaultFileName);
        api.set(normalizeData(rawData));
        if ( ! args.options.silent ) { showInfo(); }
     });

vorpal
    .command('save', 'save wallabag setup to file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-y, --yes', 'overwrite existing file')
    .alias('s')
    .validate( args => true )
    .action(async (args, cb) => {
        cb();
    });

function checkFile(fileName: string): boolean {
    const errorMessage = `bad file ${fileName}`;
    try {
        const stat = fs.statSync(fileName);
        if (stat.isFile()) {
            return true;
        } else {
            logger.error(errorMessage);
        }
    } catch (e) {
        logger.error(errorMessage);
    }
    return false;
}

function normalizeData(data: object): object {
    const ldata = {...defaultData };
    for (const key of Object.keys(data)) {
        if (key in ldata) {
            ldata[key] = data[key];
        } else {
            if (key in recodeObj) {
                ldata[recodeObj[key]] = data[key];
            }
        }
    }
    return ldata;
}

async function loadDataFromFile(file: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

function showInfo(): void  {
        const info = api.get() as object;
        for (const key of Object.keys(info)) {
            let showData = info[key];
            if ( ((key === "expireDate") || (key === "refreshExpireDate")) && (info[key] !== null) ) {
              const date = new Date(info[key]);
              showData = `${date.toDateString()} ${date.toTimeString()}`;
            }
            logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        }
}

// ------ Entry points --------
if (process.argv.slice(2).length > 0) {
    try {
        vorpal.parse(process.argv);
    } catch (e) {
        process.exit(1);
    }
} else {
    vorpal.show();
}
