"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
require("./pre-actions");
require("./commands");
(process.argv.slice(2).length === 0) && globals_1.vorpal.show() || globals_1.vorpal.parse(process.argv);
