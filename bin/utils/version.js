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
const checkVersion = (save = true, silent = false) => __awaiter(this, void 0, void 0, function* () {
    const ver = yield globals_1.api.getApiVersion(globals_1.api.get().url);
    silent || globals_1.logger.info(ver);
    if (save) {
        globals_1.api.set({ version: ver });
        globals_1.vorpal.localStorage.setItem('lastSetup', JSON.stringify(globals_1.api.get()));
    }
});
exports.checkVersion = checkVersion;
