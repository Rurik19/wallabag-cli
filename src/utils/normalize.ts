import { defaultData } from 'wallabag-api';
import { recodeObj } from '../constants';

const normalizeData = (data: object): object => {
    const ldata = {...defaultData };
    for (const key of Object.keys(data)) {
        if (key in ldata) {
            ldata[key] = data[key];
        } else {
            if (key in recodeObj) { ldata[recodeObj[key]] = data[key]; }
        }
    }
    return ldata;
};

export { normalizeData };
