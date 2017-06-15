import { vorpal, api, logger } from '../../globals';
import { showArticle } from '../../cli-ui';

export const action = async (args, cb) => {
    try {
        const article = await api.saveArticle(args.url);
        vorpal.localStorage.setItem('lastId', article.id);
        showArticle(article);
    } catch (e) {
        logger.error(e.message ? e.message : `${e.error}: ${e.error_description}`);
    }
};
