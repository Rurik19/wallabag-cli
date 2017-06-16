"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_ui_1 = require("../cli-ui");
exports.action = (args, callback) => {
    cli_ui_1.showInfo();
    callback();
};
