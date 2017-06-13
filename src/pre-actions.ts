// ----- actions before user entrypoints ---------
import { vorpal, api, logger } from './globals';

((vorpal, api, logger) => {
    try {
        const lastSetup = vorpal.localStorage.getItem('lastSetup');
        if (!lastSetup) { return; }
        api.set(JSON.parse(lastSetup));
        logger.info(`loaded setup for ${api.get().url}`);
    } catch (error) {
        logger.error(error.message);
    }
})(vorpal, api, logger);
