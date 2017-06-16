"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
(() => {
    try {
        const lastSetup = globals_1.vorpal.localStorage.getItem('lastSetup');
        if (!lastSetup) {
            return;
        }
        globals_1.api.set(JSON.parse(lastSetup));
        globals_1.logger.info(`loaded setup for ${globals_1.api.get().url}`);
        const lastId = globals_1.vorpal.localStorage.getItem('lastId');
        lastId && globals_1.logger.info(`last articler ID was ${lastId}`);
    }
    catch (error) {
        globals_1.logger.error(error.message);
    }
})();
