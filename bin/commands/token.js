"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const token_acion_1 = require("../actions/token-acion");
(() => globals_1.vorpal
    .command('token', 'get new application and refresh tokens')
    .option('-u, --user <user>', 'username')
    .option('-p, --password <password>', 'password')
    .option('-s, --silent', 'don\'t show options after load tokens')
    .alias('t')
    .action(token_acion_1.action))();
