import { vorpal, api, logger } from '../globals';
import { validate } from '../validations/url-validation';
import { action } from '../actions/version-action';

(() => vorpal
        .command('version [url]', 'get api version')
        .alias('v')
        .validate( validate )
        .action( action)
)();
