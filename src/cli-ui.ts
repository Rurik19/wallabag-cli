import { logger, api } from './globals';
import * as colors from 'chalk';

const showArticle = (article: any): void => {
    const starStr = article.is_starred ? colors.magenta('starred') : 'no-starred';
    const archStr = article.is_archived ? colors.magenta('archived') : 'no-arhived';
    const urlStr = colors.grey(article.url);
    const tagsStr = article.tags.length === 0 ? 'no-tags'
                      : `tags: ${colors.green(article.tags.map(t => t.label ).join(' '))}`;
    logger.log(`${colors.yellow(article.id) } ${colors.cyan(article.title)}
${urlStr}
${starStr} ${archStr} ${tagsStr}`);
};

const showArticles = (articles: any[]) => {
    articles.map(article => {
        showArticle(article);
        logger.log('-'.repeat(80));
    });
};

const showInfo = (prop?: string): void =>  {
    const info = api.get() as object;
    // tslint:disable-next-line:forin
    for (const key in info) {
        let showData = info[key];
        if (((key === "expireDate") || (key === "refreshExpireDate")) && (info[key] !== null)) {
            const date = new Date(info[key]);
            showData = `${date.toDateString()} ${date.toTimeString()}`;
        }
        if (key === prop) {
          logger.log(`${colors.yellow(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        } else {
          logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        }
    }
};

export { showArticle, showArticles, showInfo};
