import { vorpal } from '../globals';
import { validate } from '../validations/url-validation';
import { action } from '../actions/add-action';

( () => vorpal
    .command('add <url>', 'add page by URL to wallabag')
    .validate( validate )
    .alias('a')
    .action( action )
)();
