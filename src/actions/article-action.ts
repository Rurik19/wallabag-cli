import { vorpal, api, logger } from '../globals';
import { showArticle } from '../cli-ui';

export const action = async (args) => {
    try {
        const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
        const article = await api.getArticle(id);
        vorpal.localStorage.setItem('lastId', article.id);
        showArticle(article);
    } catch (e) {
        logger.error(JSON.stringify(e));
    }
};
