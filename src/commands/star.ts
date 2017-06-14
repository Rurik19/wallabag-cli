import { vorpal, api, logger } from '../globals';
import { showArticle } from '../cli-ui';

((vorpal, api, logger) => {
    vorpal
        .command('star [id]', 'star article by ID or the last one')
        .option('--drop', 'clear star mark')
        .validate( args => {
            const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
            if (typeof(id) !== 'number') { logger.error(`wrong article ID "${id}"`); return false; }
            return true;
        })
        .action(async (args) => {
            try {
                const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
                const article = await api.saveStarred(id, !!args.options.drop ? 0 : 1 );
                vorpal.localStorage.setItem('lastId', article.id);
                showArticle(article);
            } catch (e) {
                logger.error(JSON.stringify(e));
            }
        });
})(vorpal, api, logger);
