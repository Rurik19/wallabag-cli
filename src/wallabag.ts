import { vorpal } from './globals';
import './pre-actions';
import './commands';

(process.argv.slice(2).length === 0)
    && vorpal.show()
    || vorpal.parse(process.argv);
