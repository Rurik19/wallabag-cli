import { defaultFileName } from '../constants';
import { checkFile } from '../utils/fs-utils';

const validate = args => checkFile(args.options.file || defaultFileName);

export { validate };
