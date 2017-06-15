"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const cli_ui_1 = require("../cli-ui");
(v => v.command('info', 'shows wallabag api data')
    .alias('i')
    .action((args, callback) => {
    cli_ui_1.showInfo();
    callback();
}))(globals_1.vorpal);
