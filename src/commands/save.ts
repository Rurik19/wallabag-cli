import { vorpal, api, logger } from '../wallabag';
import fs = require('fs');
import { defaultFileName } from '../constants';
import inquirer = require('inquirer');

const prompt = inquirer.prompt;

( v => v
    .command('save', 'save wallabag setup to file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-y, --yes', 'overwrite existing file')
    .alias('s')
    .action(async (args, cb) => {
        const fileName = args.filename || defaultFileName;
        const exists = fs.existsSync(fileName);
        if ((args.options.yes) || (!exists)) {
           return await saveFile(fileName);
        }
        const answer = await prompt({
            type: 'confirm',
            name: 'overwrite',
            message: `file ${fileName} exists. Overwrite it?`
        });
        if (answer.overwrite) {
          return await saveFile(fileName);
        }
    })
)(vorpal);

async function saveFile(filename: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(api.get()), (err) => {
            if (err) { return reject(err); }
            return resolve();
        });
    });
}
