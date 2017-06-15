import { vorpal, api, logger } from '../../globals';

export const validate = args => {
    const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
    if (typeof(id) === 'number') { return true; }
    logger.error(`wrong article ID ${id}`);
    return false;
};
