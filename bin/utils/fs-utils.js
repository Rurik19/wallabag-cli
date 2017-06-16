"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const globals_1 = require("../globals");
const checkExists = (fileName) => {
    try {
        return fs.statSync(fileName).isFile();
    }
    catch (e) {
        globals_1.logger.error(JSON.stringify(e));
    }
    return false;
};
exports.checkExists = checkExists;
const checkFile = (fileName) => {
    try {
        if (fs.statSync(fileName).isFile()) {
            return true;
        }
        else {
            globals_1.logger.error(`bad file ${fileName}`);
        }
    }
    catch (e) {
        globals_1.logger.error(JSON.stringify(e));
    }
    return false;
};
exports.checkFile = checkFile;
const loadDataFromFile = (file) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
});
exports.loadDataFromFile = loadDataFromFile;
const saveFile = (filename) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(globals_1.api.get()), (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
});
exports.saveFile = saveFile;
