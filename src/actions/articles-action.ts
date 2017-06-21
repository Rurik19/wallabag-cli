import { vorpal, api, logger } from '../globals';
import { showArticles } from '../cli-ui';

export const action = async (args) => {
    logger.info(JSON.stringify(args));
    try {
        if (args.options.starred) { args.options.starred = 1;  }
        if (args.options.archived) { args.options.archived = 1; }
        const articles = await api.getArticles(args.options);
        showArticles(articles._embedded.items);
    } catch (e) {
        logger.error(JSON.stringify(e));
    }
};
