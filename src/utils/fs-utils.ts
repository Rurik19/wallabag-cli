import * as fs from 'fs';
import { api, logger } from '../globals';

const checkExists = (fileName: string): boolean => {
    try {
       return fs.statSync(fileName).isFile();
    } catch (e) { logger.error(JSON.stringify(e)); }
    return false;
};

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

const saveFile = async (filename: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(api.get()), (err) => {
            if (err) { return reject(err); }
            return resolve();
        });
    });
};

export { checkFile, loadDataFromFile, saveFile, checkExists };
