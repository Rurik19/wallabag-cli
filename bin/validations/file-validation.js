"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const fs_utils_1 = require("../utils/fs-utils");
const validate = args => fs_utils_1.checkFile(args.options.file || constants_1.defaultFileName);
exports.validate = validate;
