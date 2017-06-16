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
exports.action = (args) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = args.id || parseInt(globals_1.vorpal.localStorage.getItem('lastId'), 10);
        const article = args.add
            ? yield globals_1.api.addTags(id, args.add)
            : yield globals_1.api.removeTags(id, args.drop);
        globals_1.vorpal.localStorage.setItem('lastId', article.id);
        cli_ui_1.showArticle(article);
    }
    catch (e) {
        globals_1.logger.error(JSON.stringify(e));
    }
});
