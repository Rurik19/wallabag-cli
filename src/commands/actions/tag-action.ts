import { vorpal, api, logger } from '../../globals';
import { showArticle } from '../../cli-ui';

export const action = async (args) => {
    try {
        const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
        const article = args.add
            ? await api.addTags(id, args.add)
            : await api.removeTags(id, args.drop);
        vorpal.localStorage.setItem('lastId', article.id);
        showArticle(article);
    } catch (e) {
        logger.error(JSON.stringify(e));
    }
};
