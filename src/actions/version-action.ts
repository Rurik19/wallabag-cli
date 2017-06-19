import { api, logger, vorpal } from '../globals';
import { checkVersion } from '../utils/version';

const action = async (args, cb) => {
    const checkurl = args.url || api.get().url;
    try {
        await checkVersion( ! args.url );
    } catch (error) {
        logger.error(error.message);
    }
};

export { action };
