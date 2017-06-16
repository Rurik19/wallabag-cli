import * as fs from 'fs';
import { logger } from '../globals';

const checkFile = (fileName: string): boolean => {
    try {
        if (fs.statSync(fileName).isFile()) {
            return true;
        } else {
            logger.error(`bad file ${fileName}`);
        }
    } catch (e) { logger.error(JSON.stringify(e)); }
    return false;
};

const loadDataFromFile = async (file: string): Promise<any> =>  {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

export { checkFile, loadDataFromFile };
