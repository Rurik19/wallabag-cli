import { vorpal, api, logger } from '../globals';
import { showArticles } from '../cli-ui';

export const action = async (args) => {
    logger.info(JSON.stringify(args));
    try {
        let filter = {};
        if (args.page) { filter = { ...filter, page: args.page}; }
        const articles = await api.getArticles(filter);
//        vorpal.localStorage.setItem('lastId', article.id);
        showArticles(articles._embedded.items);
    } catch (e) {
        logger.error(JSON.stringify(e));
    }
};
