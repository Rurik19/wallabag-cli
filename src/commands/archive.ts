import { vorpal } from '../globals';
import { validate } from '../validations/id-validation';
import { action } from '../actions/archive-action';

(() =>
    vorpal
        .command('arch [id]', 'archive article by ID or the last one')
        .option('--drop', 'clear archive mark')
        .validate( validate )
        .action( action )
)();
