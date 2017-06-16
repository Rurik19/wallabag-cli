import { vorpal } from '../globals';
import { validate } from '../validations/id-validation';
import { action } from '../actions/star-action';

(() => vorpal
        .command('star [id]', 'star article by ID or the last one')
        .option('--drop', 'clear star mark')
        .validate( validate )
        .action( action )
)();
