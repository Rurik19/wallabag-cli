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
const cli_ui_1 = require("../cli-ui");
((vorpal, api, logger) => {
    vorpal
        .command('tag [id]', 'set tags fot article by ID or the last one; options --add or --drop must be set')
        .option('--add <tagList>', 'clear star mark')
        .option('--drop <tagList>', 'clear star mark')
        .validate(args => {
        const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
        if (typeof (id) !== 'number') {
            logger.error(`wrong article ID "${id}"`);
            return false;
        }
        if (!(args.options.add || args.options.drop)) {
            logger.error(`option --add or --drop must be set`);
            return false;
        }
        if (args.options.add && args.options.drop) {
            logger.error(`options --add and --drop cannot be set simulateonosly`);
            return false;
        }
        return true;
    })
        .action((args) => __awaiter(this, void 0, void 0, function* () {
        logger.info(JSON.stringify(args));
        try {
            const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
            let article = yield api.getArticle(id);
            const tagl = article.tags.map(t => t.label)
                .concat(args.add.split(','))
                .filter((x, i, a) => a.indexOf(x) === i)
                .join(',');
            article = yield api.saveTags(id, tagl);
            vorpal.localStorage.setItem('lastId', article.id);
            cli_ui_1.showArticle(article);
        }
        catch (e) {
            logger.error(JSON.stringify(e));
        }
    }));
})(globals_1.vorpal, globals_1.api, globals_1.logger);
