import { WallabagApi, defaultData } from 'wallabag-api';
import Vorpal = require('vorpal');
import vorpalLog = require('vorpal-log');
import { showInfo } from './commands/info';

const api = new WallabagApi();
const vorpal = new Vorpal();

vorpal
    .use(vorpalLog)
    .delimiter('wallabag$')
    .history('wallabag-cli')
    .localStorage('wallabag-cli');

const logger = vorpal.logger;

// ----- CLI commands --------
import './commands/info';
import './commands/version';
import './commands/load';
import './commands/save';
import './commands/url';

// ----- actions before user entrypoints ---------
try {
    const lastSetup = vorpal.localStorage.getItem('lastSetup');
    if (lastSetup) {
            api.set(JSON.parse(lastSetup));
            logger.info(`loaded last setup for ${api.get().url}`);
    }
} catch (error) {
    logger.error(error.message);
}

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
