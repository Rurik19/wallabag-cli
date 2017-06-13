"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallabag_1 = require("../wallabag");
const valid_url_1 = require("valid-url");
const colors = require("colors/safe");
(cli => cli
    .command('add <url>', 'add page by URL to wallabag')
    .validate(args => {
    if (valid_url_1.isWebUri(args.url)) {
        return true;
    }
    else {
        wallabag_1.logger.error(`${args.url} is not valid URL`);
        return false;
    }
})
    .alias('a')
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    try {
        const article = yield wallabag_1.api.saveArticle(args.url);
        showArticle(article);
    }
    catch (e) {
        e.message && wallabag_1.logger.error(e.message);
        e.error && wallabag_1.logger.error(`${e.error}: ${e.error_description}`);
    }
})))(wallabag_1.vorpal);
const showArticle = (article) => {
    const starStr = article.is_starred ? colors.magenta('starred') : 'no-starred';
    const archStr = article.is_archived ? colors.magenta('archived') : 'no-arhived';
    const urlStr = colors.grey(article.url);
    const tagsStr = article.tags.length === 0 ? 'no-tags'
        : `tags: ${colors.green(article.tags.map(t => t.label).join(' '))}`;
    wallabag_1.logger.log(`${colors.yellow(article.id)} ${colors.cyan(article.title)}
${urlStr}
${starStr} ${archStr} ${tagsStr}`);
};
