"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const valid_url_1 = require("valid-url");
const globals_1 = require("../globals");
exports.validate = (args) => {
    if (valid_url_1.isWebUri(args.url || globals_1.api.get().url)) {
        return true;
    }
    else {
        globals_1.logger.error(`${args.url} is not valid URL`);
        return false;
    }
};
