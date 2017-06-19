import { vorpal, api, logger } from '../globals';

const loadLastSetup = (): boolean => {
    const lastSetup = vorpal.localStorage.getItem('lastSetup');
    const retVal = !!lastSetup;
    if (retVal) {
        api.set(JSON.parse(lastSetup));
        logger.info(`loaded setup for ${api.get().url}`);
    }
    return retVal;
};

const showLastID = () => {
    const lastId = vorpal.localStorage.getItem('lastId');
    lastId && logger.info(`last articler ID was ${lastId}`);
};

export { loadLastSetup, showLastID };
