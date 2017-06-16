"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const url_validation_1 = require("../validations/url-validation");
const version_action_1 = require("../actions/version-action");
(() => globals_1.vorpal
    .command('version [url]', 'get api version')
    .alias('v')
    .validate(url_validation_1.validate)
    .action(version_action_1.action))();
