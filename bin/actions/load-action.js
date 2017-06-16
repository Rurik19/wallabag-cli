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
const globals_1 = require("../globals");
const cli_ui_1 = require("../cli-ui");
const constants_1 = require("../constants");
const normalize_1 = require("../utils/normalize");
const file_utils_1 = require("../utils/file-utils");
const action = (args, cb) => __awaiter(this, void 0, void 0, function* () {
    const rawData = yield file_utils_1.loadDataFromFile(args.options.file || constants_1.defaultFileName);
    const normData = normalize_1.normalizeData(rawData);
    globals_1.api.set(normData);
    globals_1.vorpal.localStorage.setItem('lastSetup', JSON.stringify(normData));
    if (!args.options.silent) {
        cli_ui_1.showInfo();
    }
});
exports.action = action;
