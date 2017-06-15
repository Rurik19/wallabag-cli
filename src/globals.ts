
import { WallabagApi, defaultData } from 'wallabag-api';
import * as Vorpal from 'vorpal';
import * as vorpalLog from 'vorpal-log';
const api = new WallabagApi();
const vorpal = new Vorpal();
vorpal
    .use(vorpalLog)
    .delimiter('wallabag$')
    .history('wallabag-cli')
    .localStorage('wallabag-cli');
const logger = vorpal.logger;
export { vorpal, api, logger };
