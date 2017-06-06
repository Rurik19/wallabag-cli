import { WallabagApi, defaultData } from 'wallabag-api';
import { isWebUri } from 'valid-url';

import Vorpal = require('vorpal');
import vorpalLog = require('vorpal-log');
import colors = require('colors/safe');
import fs = require('fs');

const api = new WallabagApi();
const vorpal = new Vorpal();

// const loadedData = loadDataFromFile('./wallabag.json');
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

// logger.log('This is a wallabag cli program.');

// if (loadedData !== null)  { logger.log('Data are loaded from the wallabag.json file.'); }
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
    .command('load [file]', 'load wallabag setup from file. default filename is "wallabag.json"')
    .alias('l')
    .validate( (args) => {
        const errorMessage = colors.red(`bad file ${args.file}`);
        const filename = args.file || defaultFileName;
        try {
            const stat = fs.statSync(filename);
            if (stat.isFile()) {
                return true;
            } else {
                return errorMessage;
            }
        } catch (e) {
            return errorMessage;
        }
    })
    .action(async (args, cb) => {
        return await loadDataFromFile(args.file || defaultFileName)
            .then( (data) => {
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
                api.set(ldata);
                showInfo();
             } );
    });

if (process.argv.slice(2).length > 0) {
    try {
        vorpal.parse(process.argv);
    } catch (e) {
        process.exit(1);
    }
} else {
    vorpal.show();
}

const loadDataFromFile = async (file: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const showInfo = () => {
        const info = api.get() as object;
        for (const key of Object.keys(info)) {
            let showData = info[key];
            if ( ((key === "expireDate") || (key === "refreshExpireDate")) && (info[key] !== null) ) {
              const date = new Date(info[key]);
              showData = `${date.toDateString()} ${date.toTimeString()}`;
            }
            logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        }
};
