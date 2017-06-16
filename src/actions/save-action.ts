import { saveFile, checkExists } from '../utils/fs-utils';
import { defaultFileName } from '../constants';
import { vorpal } from '../globals';

const overwriteQuestion = {
            type: 'confirm',
            name: 'overwrite',
            message: `file already exists. Overwrite it?`
        };

const action = async (args, cb) => {
    const fileName = args.options.filename || defaultFileName;
    const exists = checkExists(fileName);
    if ((args.options.yes) || (!exists)) {
        return await saveFile(fileName);
    }
    const answer = await vorpal.activeCommand.prompt(overwriteQuestion);
    if (answer.overwrite) {
        return await saveFile(fileName);
    }
};

export { action };
