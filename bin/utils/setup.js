"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const loadLastSetup = () => {
    const lastSetup = globals_1.vorpal.localStorage.getItem('lastSetup');
    const retVal = !!lastSetup;
    if (retVal) {
        globals_1.api.set(JSON.parse(lastSetup));
        globals_1.logger.info(`loaded setup for ${globals_1.api.get().url}`);
    }
    return retVal;
};
exports.loadLastSetup = loadLastSetup;
const showLastID = () => {
    const lastId = globals_1.vorpal.localStorage.getItem('lastId');
    lastId && globals_1.logger.info(`last articler ID was ${lastId}`);
};
exports.showLastID = showLastID;
