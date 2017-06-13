
import { vorpal } from './globals';
import './pre-actions';
import './commands';
// ------ Entry point --------
(process.argv.slice(2).length === 0) && vorpal.show() || vorpal.parse(process.argv);
