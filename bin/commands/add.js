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
const globals_1 = require("../globals");
const valid_url_1 = require("valid-url");
const cli_ui_1 = require("../cli-ui");
(cli => cli
    .command('add <url>', 'add page by URL to wallabag')
    .validate(args => {
    if (valid_url_1.isWebUri(args.url)) {
        return true;
    }
    else {
        globals_1.logger.error(`${args.url} is not valid URL`);
        return false;
    }
})
    .alias('a')
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    try {
        const article = yield globals_1.api.saveArticle(args.url);
        globals_1.vorpal.localStorage.setItem('lastId', article.id);
        cli_ui_1.showArticle(article);
    }
    catch (e) {
        globals_1.logger.error(e.message ? e.message : `${e.error}: ${e.error_description}`);
    }
})))(globals_1.vorpal);
