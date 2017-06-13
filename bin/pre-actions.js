"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
((vorpal, api, logger) => {
    try {
        const lastSetup = vorpal.localStorage.getItem('lastSetup');
        if (!lastSetup) {
            return;
        }
        api.set(JSON.parse(lastSetup));
        logger.info(`loaded setup for ${api.get().url}`);
    }
    catch (error) {
        logger.error(error.message);
    }
})(globals_1.vorpal, globals_1.api, globals_1.logger);
