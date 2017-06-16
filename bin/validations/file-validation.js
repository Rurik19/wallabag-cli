"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const file_utils_1 = require("../utils/file-utils");
const validate = args => file_utils_1.checkFile(args.options.file || constants_1.defaultFileName);
exports.validate = validate;
