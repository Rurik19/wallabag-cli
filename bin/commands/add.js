"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const url_validation_1 = require("../validations/url-validation");
const add_action_1 = require("../actions/add-action");
(() => globals_1.vorpal
    .command('add <url>', 'add page by URL to wallabag')
    .validate(url_validation_1.validate)
    .alias('a')
    .action(add_action_1.action))();
