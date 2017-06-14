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
const globals_1 = require("../globals");
const cli_ui_1 = require("../cli-ui");
const questions = [{
        type: 'editor',
        name: 'user',
        message: 'Enter username: '
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter password: '
    }];
(cli => cli
    .command('token', 'get new application and refresh tokens')
    .option('-u, --user <user>', 'username')
    .option('-p, --password <password>', 'password')
    .option('-s, --silent', 'don\'t show options after load tokens')
    .alias('t')
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    let u = args.options.user;
    let p = args.options.password;
    if (!u || !p) {
        const answers = yield globals_1.vorpal.activeCommand.prompt(questions);
        u = answers.user;
        p = answers.password;
    }
    try {
        yield globals_1.api.getApplicationToken(u, p);
        globals_1.vorpal.localStorage.setItem('lastSetup', JSON.stringify(globals_1.api.get()));
        args.options.silent || cli_ui_1.showInfo();
    }
    catch (e) {
        globals_1.logger.error(e.message ? e.message : `${e.error}: ${e.error_description}`);
    }
})))(globals_1.vorpal);
