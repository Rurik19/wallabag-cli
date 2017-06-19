import { isWebUri } from 'valid-url';
import { api, logger } from '../globals';

export const validate = (args) => {
    if (isWebUri( args.url || api.get().url )) {
        return true;
    } else {
        logger.error(`${args.url} is not valid URL`);
        return false;
    }
};
