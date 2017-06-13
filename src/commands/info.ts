import { vorpal, api, logger } from '../globals';
import colors = require('colors/safe');

( v =>
    v.command('info', 'shows wallabag api data')
     .alias('i')
     .action((args, callback) => {
            showInfo();
            callback();
      })
)(vorpal);

export const showInfo = (prop?: string): void =>  {
    const info = api.get() as object;
    for (const key of Object.keys(info)) {
        let showData = info[key];
        if (((key === "expireDate") || (key === "refreshExpireDate")) && (info[key] !== null)) {
            const date = new Date(info[key]);
            showData = `${date.toDateString()} ${date.toTimeString()}`;
        }
        if (key === prop) {
          logger.log(`${colors.yellow(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        } else {
          logger.log(`${colors.green(key)} ${' '.repeat(20 - key.length)} ${showData}`);
        }
    }
};
