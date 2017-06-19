// ----- actions before user entrypoints ---------
import { vorpal, api, logger } from './globals';
import { loadLastSetup, showLastID } from './utils/setup';
import { checkVersion } from './utils/version';

(async () => {
    try {
        if ( loadLastSetup() ) {
            await checkVersion();
        }
        showLastID();
    } catch (error) {
        logger.error(error.message);
    }
})();
