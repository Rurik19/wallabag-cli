"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallabag_1 = require("../wallabag");
const inquirer = require("inquirer");
const info_1 = require("./info");
const prompt = inquirer.prompt;
const questions = [{
        type: 'editor',
        name: 'user',
        message: 'Enter username'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter password'
    }];
(cli => cli
    .command('token', 'get new application and refresh tokens')
    .option('-u, --user <user>', 'username')
    .option('-p, --password <password>', 'password')
    .option('-s, --silent', 'don\'t show options after load tokens')
    .alias('t')
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    wallabag_1.logger.info(JSON.stringify(args));
    let u = '';
    let p = '';
    if (!args.options.user || !args.options.password) {
        const answers = yield prompt(questions);
        u = answers.user;
        p = answers.password;
    }
    else {
        u = args.options.user;
        p = args.options.password;
    }
    try {
        yield wallabag_1.api.getApplicationToken(u, p);
        wallabag_1.vorpal.localStorage.setItem('lastSetup', JSON.stringify(wallabag_1.api.get()));
        if (!args.options.silent) {
            info_1.showInfo();
        }
    }
    catch (e) {
        e.message && wallabag_1.logger.error(e.message);
        e.error && wallabag_1.logger.error(`${e.error}: ${e.error_description}`);
    }
})))(wallabag_1.vorpal);
