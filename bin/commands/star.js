"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
((vorpal, api, logger) => {
    vorpal
        .command('star [id]', 'star article by ID or the last one')
        .validate(args => {
        const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
        if (typeof (id) === 'number') {
            return true;
        }
        logger.error(`wrong article ID ${id}`);
        return false;
    })
        .action((args) => {
        logger.info(JSON.stringify(args));
    });
})(globals_1.vorpal, globals_1.api, globals_1.logger);
