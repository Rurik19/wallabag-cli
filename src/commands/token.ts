import { vorpal, api, logger } from '../wallabag';
import { IWData } from 'wallabag-api';
import inquirer = require('inquirer');
import { showInfo } from './info';

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

( cli => cli
    .command('token', 'get new application and refresh tokens')
    .option('-u, --user <user>', 'username')
    .option('-p, --password <password>', 'password' )
    .option('-s, --silent', 'don\'t show options after load tokens' )
    .alias('t')
    .action(async (args, cb) => {
        logger.info(JSON.stringify(args));
        let u = '';
        let p = '';
        if (!args.options.user || !args.options.password) {
            const answers = await prompt(questions);
            u = answers.user;
            p = answers.password;
        } else {
            u = args.options.user;
            p = args.options.password;
        }
        try {
            await api.getApplicationToken(u, p);
            vorpal.localStorage.setItem('lastSetup', JSON.stringify(api.get()));
            if ( ! args.options.silent ) { showInfo(); }
        } catch (e) {
            e.message && logger.error(e.message);
            e.error && logger.error(`${e.error}: ${e.error_description}`);
        }
    })
)(vorpal);
