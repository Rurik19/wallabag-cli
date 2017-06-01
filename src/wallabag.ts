import { WallabagApi } from 'wallabag-api';
const api = new WallabagApi();
import Vorpal = require('vorpal');
import vorpalLog = require('vorpal-log');
import colors = require('colors/safe');

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
        const info = api.get() as object;
        for (const key of Object.keys(info)) {
            logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${info[key]}`);
        }
        callback();
    });

vorpal
    .command('url [url]', 'show or set wallabag URL ')
    .action((args, callback) => {
        if ( args.url !== undefined ) {
            api.set({ url: args.url});
        }
        logger.log(`${colors.green('url')} ${' '.repeat(20 - 'url'.length)} ${api.get().url}`);
        callback();
    });

vorpal
    .command('version', 'get api version')
    .action(async (arg, cb) => {
        if (api.get().url === null) {
            logger.error('empty url');
        } else {
            const v = await api.getApiVersion();
            logger.info(`Api version ${v}`);
            cb();
        }
    });
