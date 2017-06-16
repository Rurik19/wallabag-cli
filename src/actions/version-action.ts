import { api, logger } from '../globals';

const action = async (args, cb) => {
    const checkurl = args.url || api.get().url;
    args.url || logger.info(checkurl);
    try {
        const ver = await api.getApiVersion(checkurl);
        logger.info(ver);
    } catch (error) {
        logger.error(error.message);
    }
};

export { action };
