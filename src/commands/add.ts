import { vorpal, api, logger } from '../wallabag';
import { isWebUri } from 'valid-url';
import { IWData } from 'wallabag-api';
import colors = require('colors/safe');

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
//            console.log(typeof(api.saveArticle));
            const article = await api.saveArticle(args.url);
//            vorpal.localStorage.setItem('lastEntryId', article.id.toString());
            showArticle(article);
        } catch (e) {
	    e.message && logger.error(e.message);
	    e.error && logger.error(`${e.error}: ${e.error_description}`);
        }
    })
)(vorpal);

const showArticle = (article: any): void => {
//    logger.info(JSON.stringify(article));
    const starStr = article.is_starred ? colors.magenta('starred') : 'no-starred';
    const archStr = article.is_archived ? colors.magenta('archived') : 'no-arhived';
    const tagsStr = article.tags.length === 0 ? 'no-tags'
                      : `tags: ${colors.green(article.tags.map(t => t.label ).join(' '))}`;
    logger.log(`${colors.yellow(article.id) } ${colors.cyan(article.title)}
${starStr} ${archStr} ${tagsStr}`);
};
