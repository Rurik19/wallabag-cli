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
(v => v.command('version [url]', 'get api version')
    .alias('v')
    .validate((args) => {
    const url = args.url || globals_1.api.get().url;
    if (!valid_url_1.isWebUri(url)) {
        globals_1.logger.error(`incorrect URL: ${url} `);
        return false;
    }
    return true;
})
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    const checkurl = args.url || globals_1.api.get().url;
    args.url || globals_1.logger.info(checkurl);
    try {
        const ver = yield globals_1.api.getApiVersion(checkurl);
        globals_1.logger.info(ver);
    }
    catch (error) {
        globals_1.logger.error(error.message);
    }
})))(globals_1.vorpal);
