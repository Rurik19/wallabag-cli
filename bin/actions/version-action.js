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
const version_1 = require("../utils/version");
const action = (args, cb) => __awaiter(this, void 0, void 0, function* () {
    const checkurl = args.url || globals_1.api.get().url;
    try {
        yield version_1.checkVersion(!args.url);
    }
    catch (error) {
        globals_1.logger.error(error.message);
    }
});
exports.action = action;
