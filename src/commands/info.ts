import { vorpal, api, logger } from '../globals';
import { showInfo } from '../cli-ui';

( v =>
    v.command('info', 'shows wallabag api data')
     .alias('i')
     .action((args, callback) => {
            showInfo();
            callback();
      })
)(vorpal);
