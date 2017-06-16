"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const file_validation_1 = require("../validations/file-validation");
const load_action_1 = require("../actions/load-action");
(() => globals_1.vorpal
    .command('load', 'load wallabag setup from file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-s, --silent', 'don\'t show options after load')
    .alias('l')
    .validate(file_validation_1.validate)
    .action(load_action_1.action))();
