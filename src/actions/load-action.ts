import { vorpal, api } from '../globals';
import { showInfo } from '../cli-ui';
import { defaultFileName } from '../constants';
import { normalizeData } from '../utils/normalize';
import { checkVersion } from '../utils/version';
import { loadDataFromFile } from '../utils/fs-utils';

const action = async (args, cb) => {
        const rawData = await loadDataFromFile(args.options.file || defaultFileName);
        const normData = normalizeData(rawData);
        api.set(normData);
        vorpal.localStorage.setItem('lastSetup', JSON.stringify(normData));
        await checkVersion(true, true);
        if ( ! args.options.silent ) { showInfo(); }
     };

export { action };
