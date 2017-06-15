import { vorpal } from '../globals';
import { action } from './actions/info-action';

( () =>
    vorpal
     .command('info', 'shows wallabag api data')
     .alias('i')
     .action( action )
)();
