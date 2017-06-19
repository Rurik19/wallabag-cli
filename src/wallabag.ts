import { vorpal } from './globals';
import './pre-actions';
import './commands';
import { commandsFactory } from './factory';

commandsFactory('articles', 'get articles by filters and pages', 'ag',
               [['--page --pg <pageNo>', 'page number'],
                ['--per-page --pp <pageNo>', 'articles per page']]
                );

// ------ Entry point --------
(process.argv.slice(2).length === 0)
    && vorpal.show()
    || vorpal.parse(process.argv);
