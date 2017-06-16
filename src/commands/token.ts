import { vorpal, api, logger } from '../globals';
import { showInfo } from '../cli-ui';
import { action } from '../actions/token-acion';

(() => vorpal
    .command('token', 'get new application and refresh tokens')
    .option('-u, --user <user>', 'username')
    .option('-p, --password <password>', 'password' )
    .option('-s, --silent', 'don\'t show options after load tokens' )
    .alias('t')
    .action(action)
)();
