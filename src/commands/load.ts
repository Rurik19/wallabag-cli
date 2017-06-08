import { defaultData } from 'wallabag-api';
import { vorpal, api, logger } from '../wallabag';
import { showInfo } from './info';
import fs = require('fs');
import { recodeObj, defaultFileName } from '../constants';

( v => v
    .command('load', 'load wallabag setup from file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-s, --silent', 'don\'t show options after load' )
    .alias('l')
    .validate( args => checkFile(args.options.filename || defaultFileName) )
    .action(async (args, cb) => {
        const rawData = await loadDataFromFile(args.options.filename || defaultFileName);
        const normData = normalizeData(rawData);
        api.set(normData);
        vorpal.localStorage.setItem('lastSetup', JSON.stringify(normData));
        if ( ! args.options.silent ) { showInfo(); }
     })
)(vorpal);

const checkFile = (fileName: string): boolean => {
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
};

const normalizeData = (data: object): object => {
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
};

const loadDataFromFile = async (file: string): Promise<any> =>  {
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
