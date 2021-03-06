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
const fs_utils_1 = require("../utils/fs-utils");
const constants_1 = require("../constants");
const globals_1 = require("../globals");
const overwriteQuestion = {
    type: 'confirm',
    name: 'overwrite',
    message: `file already exists. Overwrite it?`
};
const action = (args, cb) => __awaiter(this, void 0, void 0, function* () {
    const fileName = args.options.filename || constants_1.defaultFileName;
    const exists = fs_utils_1.checkExists(fileName);
    if ((args.options.yes) || (!exists)) {
        return yield fs_utils_1.saveFile(fileName);
    }
    const answer = yield globals_1.vorpal.activeCommand.prompt(overwriteQuestion);
    if (answer.overwrite) {
        return yield fs_utils_1.saveFile(fileName);
    }
});
exports.action = action;
