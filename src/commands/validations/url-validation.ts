import { isWebUri } from 'valid-url';
import { logger } from '../../globals';

export const validate = (args) => {
    if (isWebUri(args.url)) {
        return true;
    } else {
        logger.error(`${args.url} is not valid URL`);
        return false;
    }
};
