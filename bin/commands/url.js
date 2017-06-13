"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const valid_url_1 = require("valid-url");
const info_1 = require("./info");
(v => v
    .command('url [url]', 'show or set wallabag URL ')
    .alias('u')
    .validate((args) => {
    if ((args.url === undefined) || valid_url_1.isWebUri(args.url)) {
        return true;
    }
    else {
        globals_1.logger.error(`url ${args.url} is incorrect`);
        return false;
    }
})
    .action((args, callback) => {
    globals_1.api.set({ url: args.url });
    info_1.showInfo('url');
    callback();
}))(globals_1.vorpal);
