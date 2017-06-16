"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallabag_api_1 = require("wallabag-api");
const constants_1 = require("../constants");
const normalizeData = (data) => {
    const ldata = Object.assign({}, wallabag_api_1.defaultData);
    for (const key of Object.keys(data)) {
        if (key in ldata) {
            ldata[key] = data[key];
        }
        else {
            if (key in constants_1.recodeObj) {
                ldata[constants_1.recodeObj[key]] = data[key];
            }
        }
    }
    return ldata;
};
exports.normalizeData = normalizeData;
