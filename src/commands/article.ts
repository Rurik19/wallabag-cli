import { vorpal, api, logger } from '../globals';
import { showArticle } from '../cli-ui';

((vorpal, api, logger) => {
    vorpal
        .command('article [id]', 'gets article by ID or the last one')
        .validate( args => {
            const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
            if (typeof(id) !== 'number') { logger.error(`wrong article ID "${id}"`); return false; }
            return true;
        })
        .action(async (args) => {
            try {
                const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
                const article = await api.getArticle(id);
                vorpal.localStorage.setItem('lastId', article.id);
                showArticle(article);
            } catch (e) {
                logger.error(JSON.stringify(e));
            }
        });
})(vorpal, api, logger);
