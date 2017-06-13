import { vorpal, api, logger } from '../globals';

((vorpal, api, logger) => {
    vorpal
        .command('star [id]', 'star article by ID or the last one')
        .validate( args => {
            const id = args.id || parseInt(vorpal.localStorage.getItem('lastId'), 10);
            if (typeof(id) === 'number') { return true; }
            logger.error(`wrong article ID ${id}`);
            return false;
        })
        .action( (args) => {
            logger.info(JSON.stringify(args));
        });
})(vorpal, api, logger);
