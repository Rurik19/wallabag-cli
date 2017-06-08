import { WallabagApi, defaultData } from 'wallabag-api';
import Vorpal = require('vorpal');
import vorpalLog = require('vorpal-log');

const api = new WallabagApi();
const vorpal = new Vorpal();

vorpal
    .use(vorpalLog)
    .delimiter('wallabag$')
    .history('wallabag-cli');

const logger = vorpal.logger;

// ----- CLI commands --------
import './commands/info';
import './commands/version';
import './commands/load';
import './commands/save';
import './commands/url';

// ------ Entry points --------
if (process.argv.slice(2).length > 0) {
    try {
        vorpal.parse(process.argv);
    } catch (e) {
        process.exit(1);
    }
} else {
    vorpal.show();
}

export { vorpal, api, logger };
