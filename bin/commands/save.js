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
const wallabag_1 = require("../wallabag");
const fs = require("fs");
const constants_1 = require("../constants");
const inquirer = require("inquirer");
const prompt = inquirer.prompt;
(v => v
    .command('save', 'save wallabag setup to file or localStorage. default: file "wallabag.json"')
    .option('-f, --file <filename>', 'file to load options from')
    .option('-y, --yes', 'overwrite existing file')
    .alias('s')
    .action((args, cb) => __awaiter(this, void 0, void 0, function* () {
    const fileName = args.options.filename || constants_1.defaultFileName;
    const exists = fs.existsSync(fileName);
    if ((args.options.yes) || (!exists)) {
        return yield saveFile(fileName);
    }
    const answer = yield prompt({
        type: 'confirm',
        name: 'overwrite',
        message: `file ${fileName} exists. Overwrite it?`
    });
    if (answer.overwrite) {
        return yield saveFile(fileName);
    }
})))(wallabag_1.vorpal);
const saveFile = (filename) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, JSON.stringify(wallabag_1.api.get()), (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
});
