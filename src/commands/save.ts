import { vorpal, api, logger } from '../globals';
import * as fs from 'fs';
import { defaultFileName } from '../constants';

const overwriteQuestion = {
            type: 'confirm',
            name: 'overwrite',
            message: `file already exists. Overwrite it?`
        };

( v => v
    .command('save', 'save wallabag setup to file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-y, --yes', 'overwrite existing file')
    .alias('s')
    .action(async (args, cb) => {
        const fileName = args.options.filename || defaultFileName;
        const exists = fs.existsSync(fileName);
        if ((args.options.yes) || (!exists)) {
           return await saveFile(fileName);
        }
        const answer = await vorpal.activeCommand.prompt(overwriteQuestion);
        if (answer.overwrite) {
          return await saveFile(fileName);
        }
    })
)(vorpal);

const saveFile = async (filename: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(api.get()), (err) => {
            if (err) { return reject(err); }
            return resolve();
        });
    });
};
