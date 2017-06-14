import { vorpal, api, logger } from '../globals';
import colors = require('colors/safe');
import { showInfo } from '../cli-ui';

( v =>
    v.command('info', 'shows wallabag api data')
     .alias('i')
     .action((args, callback) => {
            showInfo();
            callback();
      })
)(vorpal);
