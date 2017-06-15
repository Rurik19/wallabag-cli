import { vorpal, api, logger } from '../globals';
import { isWebUri } from 'valid-url';
import { IWData } from 'wallabag-api';
import * as colors from 'colors/safe';
import { showArticle } from '../cli-ui';

( cli => cli
    .command('add <url>', 'add page by URL to wallabag')
    .validate( args => {
        if (isWebUri(args.url)) {
            return true;
        } else {
            logger.error(`${args.url} is not valid URL`);
            return false;
        }
    })
    .alias('a')
    .action(async (args, cb) => {
        try {
            const article = await api.saveArticle(args.url);
            vorpal.localStorage.setItem('lastId', article.id);
            showArticle(article);
        } catch (e) {
            logger.error(e.message ? e.message : `${e.error}: ${e.error_description}`);
        }
    })
)(vorpal);
