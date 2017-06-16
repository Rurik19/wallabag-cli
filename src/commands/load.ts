import { vorpal } from '../globals';
import { validate } from '../validations/file-validation';
import { action } from '../actions/load-action';

(() => vorpal
    .command('load', 'load wallabag setup from file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-s, --silent', 'don\'t show options after load' )
    .alias('l')
    .validate( validate )
    .action( action )
)();
