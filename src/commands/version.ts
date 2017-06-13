import { vorpal, api, logger } from '../globals';
import { isWebUri } from 'valid-url';

( v =>
   v.command('version [url]', 'get api version')
    .alias('v')
    .validate((args) => {
        const url = args.url || api.get().url;
        if ( !isWebUri(url) ) {
            logger.error(`incorrect URL: ${url} `);
            return false;
        }
        return true;
    })
    .action(async (args, cb) => {
            const checkurl = args.url || api.get().url;
            args.url || logger.info(checkurl);
            try {
                const ver = await api.getApiVersion(checkurl);
                logger.info(ver);
            } catch (error) {
                logger.error(error.message);
            }
    })
)(vorpal);
