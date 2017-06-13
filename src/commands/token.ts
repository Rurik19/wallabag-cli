import { vorpal, api, logger } from '../wallabag';
import { IWData } from 'wallabag-api';
import { showInfo } from './info';

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

( cli => cli
    .command('token', 'get new application and refresh tokens')
    .option('-u, --user <user>', 'username')
    .option('-p, --password <password>', 'password' )
    .option('-s, --silent', 'don\'t show options after load tokens' )
    .alias('t')
    .action(async (args, cb) => {
         let  u = args.options.user;
         let  p = args.options.password;
         if (!u || !p) {
             const answers = await vorpal.activeCommand.prompt(questions);
             u = answers.user;
             p = answers.password;
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
