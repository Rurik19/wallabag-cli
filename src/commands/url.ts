import { vorpal, api, logger } from '../wallabag';
import { isWebUri } from 'valid-url';
import { showInfo } from './info';

( v => v
    .command('url [url]', 'show or set wallabag URL ')
    .alias('u')
    .validate((args) => {
        if ( (args.url === undefined) || isWebUri(args.url) ) {
            return true;
        } else {
            logger.error(`url ${args.url} is incorrect`);
            return false;
        }
    })
    .action((args, callback) => {
        api.set({ url: args.url});
        showInfo('url');
        callback();
    })
)(vorpal);