import { vorpal, api, logger } from '../globals';
import { defaultFileName } from '../constants';
import { action } from '../actions/save-action';

(() => vorpal
    .command('save', 'save wallabag setup to file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-y, --yes', 'overwrite existing file')
    .alias('s')
    .action( action )
)();
