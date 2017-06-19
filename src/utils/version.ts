import { api, logger, vorpal } from '../globals';

const checkVersion = async (save: boolean = true, silent: boolean = false) => {
    const ver = await api.getApiVersion(api.get().url);
    silent || logger.info(ver);
    if (save) {
        api.set({ version: ver});
        vorpal.localStorage.setItem('lastSetup', JSON.stringify(api.get()));
    }
};

export { checkVersion };
