import { logger } from './globals';
import colors = require('colors/safe');

export const showArticle = (article: any): void => {
    const starStr = article.is_starred ? colors.magenta('starred') : 'no-starred';
    const archStr = article.is_archived ? colors.magenta('archived') : 'no-arhived';
    const urlStr = colors.grey(article.url);
    const tagsStr = article.tags.length === 0 ? 'no-tags'
                      : `tags: ${colors.green(article.tags.map(t => t.label ).join(' '))}`;
    logger.log(`${colors.yellow(article.id) } ${colors.cyan(article.title)}
${urlStr}
${starStr} ${archStr} ${tagsStr}`);
};
