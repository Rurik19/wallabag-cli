"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
const colors = require("colors/safe");
const showArticle = (article) => {
    const starStr = article.is_starred ? colors.magenta('starred') : 'no-starred';
    const archStr = article.is_archived ? colors.magenta('archived') : 'no-arhived';
    const urlStr = colors.grey(article.url);
    const tagsStr = article.tags.length === 0 ? 'no-tags'
        : `tags: ${colors.green(article.tags.map(t => t.label).join(' '))}`;
    globals_1.logger.log(`${colors.yellow(article.id)} ${colors.cyan(article.title)}
${urlStr}
${starStr} ${archStr} ${tagsStr}`);
};
exports.showArticle = showArticle;
const showArticles = (articles) => {
    articles.map(article => {
        showArticle(article);
        globals_1.logger.log('-'.repeat(80));
    });
};
exports.showArticles = showArticles;
const showInfo = (prop) => {
    const info = globals_1.api.get();
    for (const key in info) {
        let showData = info[key];
        if (((key === "expireDate") || (key === "refreshExpireDate")) && (info[key] !== null)) {
            const date = new Date(info[key]);
            showData = `${date.toDateString()} ${date.toTimeString()}`;
        }
        if (key === prop) {
            globals_1.logger.log(`${colors.yellow(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        }
        else {
            globals_1.logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        }
    }
};
exports.showInfo = showInfo;
