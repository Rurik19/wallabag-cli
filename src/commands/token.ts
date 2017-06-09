import { vorpal, api, logger } from '../wallabag';
import { IWData } from 'wallabag-api';

( cli => cli
    .command('token', 'get new application and refresh tokens')
    .option('-u, --user <filename>', 'username')
    .option('-p, --password <password>', 'password' )
    .alias('t')
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
