import { vorpal } from '../globals';
import { validate } from './validations/id-validation';
import { action } from './actions/article-action';

(() =>
    vorpal
        .command('article [id]', 'gets article by ID or the last one')
        .validate( validate )
        .action( action)
)();
