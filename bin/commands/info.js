"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const info_action_1 = require("../actions/info-action");
(() => globals_1.vorpal
    .command('info', 'shows wallabag api data')
    .alias('i')
    .action(info_action_1.action))();
