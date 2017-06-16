"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const save_action_1 = require("../actions/save-action");
(() => globals_1.vorpal
    .command('save', 'save wallabag setup to file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-y, --yes', 'overwrite existing file')
    .alias('s')
    .action(save_action_1.action))();
