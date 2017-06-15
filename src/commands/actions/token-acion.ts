import { vorpal, api, logger } from '../../globals';
import { showInfo } from '../../cli-ui';

const questions = [{ type: 'editor',   name: 'user',     message: 'Enter username: '},
                   { type: 'password', name: 'password', message: 'Enter password: '}];

export const action = async (args, cb) => {
    let  u = args.options.user;
    let  p = args.options.password;
    if (!u || !p) {
        const answers = await vorpal.activeCommand.prompt(questions);
        u = answers.user;
        p = answers.password;
    }
    try {
        await api.getApplicationToken(u, p);
        vorpal.localStorage.setItem('lastSetup', JSON.stringify(api.get()));
        args.options.silent || showInfo();
    } catch (e) {
        logger.error(e.message ? e.message : `${e.error}: ${e.error_description}`);
    }
};
