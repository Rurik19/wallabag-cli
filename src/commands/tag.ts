import { vorpal, api, logger } from '../globals';
import { showArticle } from '../cli-ui';

((vorpal, api, logger) => {
    vorpal
        .command('tag [id]', 'set tags fot article by ID or the last one; options --add or --drop must be set')
        .option('--add <tagList>', 'clear star mark')
        .option('--drop <tagList>', 'clear star mark')
        .validate( args => {
            const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
            if (typeof(id) !== 'number') { logger.error(`wrong article ID "${id}"`); return false; }
            if ( ! (args.options.add || args.options.drop) ) {
                logger.error(`option --add or --drop must be set`); return false; }
            if ( args.options.add && args.options.drop ) {
                logger.error(`options --add and --drop cannot be set simulateonosly`); return false; }
            return true;
        })
        .action(async (args) => {
            logger.info(JSON.stringify(args));
            try {
                const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
                let article = await api.getArticle(id);
                const tagl = article.tags.map(t => t.label)
                             .concat(args.add.split(','))
                             .filter((x, i, a) => a.indexOf(x) === i )
                             .join(',');
                article = await api.saveTags(id, tagl );
                vorpal.localStorage.setItem('lastId', article.id);
                showArticle(article);
            } catch (e) {
                logger.error(JSON.stringify(e));
            }
        });
})(vorpal, api, logger);
