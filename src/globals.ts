
import { WallabagApi, defaultData } from 'wallabag-api';
import Vorpal = require('vorpal');
import vorpalLog = require('vorpal-log');
const api = new WallabagApi();
const vorpal = new Vorpal();
vorpal
    .use(vorpalLog)
    .delimiter('wallabag$')
    .history('wallabag-cli')
    .localStorage('wallabag-cli');
const logger = vorpal.logger;
export { vorpal, api, logger };
