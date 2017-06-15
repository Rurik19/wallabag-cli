"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../../globals");
exports.validate = (args) => {
    const id = args.id || parseInt(globals_1.vorpal.localStorage.getItem('lastId'), 10);
    if (typeof (id) !== 'number') {
        globals_1.logger.error(`wrong article ID "${id}"`);
        return false;
    }
    if (!(args.options.add || args.options.drop)) {
        globals_1.logger.error(`option --add or --drop must be set`);
        return false;
    }
    if (args.options.add && args.options.drop) {
        globals_1.logger.error(`options --add and --drop cannot be set simulateonosly`);
        return false;
    }
};
