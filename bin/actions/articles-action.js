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
    globals_1.logger.info(JSON.stringify(args));
    try {
        let filter = {};
        if (args.page) {
            filter = Object.assign({}, filter, { page: args.page });
        }
        const articles = yield globals_1.api.getArticles(filter);
        cli_ui_1.showArticles(articles._embedded.items);
    }
    catch (e) {
        globals_1.logger.error(JSON.stringify(e));
    }
});
