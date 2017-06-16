import { vorpal } from '../globals';
import { validate } from '../validations/tag-validate';
import { action } from '../actions/tag-action';

(() => vorpal
        .command('tag [id]', 'set tags fot article by ID or the last one')
        .option('--add <tagList>', 'add tags')
        .option('--drop <tagList>', 'remove tags')
        .validate( validate )
        .action( action )
)();
