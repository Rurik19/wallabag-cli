import { vorpal, logger } from '../globals';

export const validate = (args) => {
    const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
    if (typeof(id) !== 'number') { logger.error(`wrong article ID "${id}"`); return false; }
    if ( ! (args.options.add || args.options.drop) ) {
        logger.error(`option --add or --drop must be set`); return false; }
    if ( args.options.add && args.options.drop ) {
        logger.error(`options --add and --drop cannot be set simulateonosly`); return false; }
};
