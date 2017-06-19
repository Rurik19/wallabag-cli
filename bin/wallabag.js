"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
require("./pre-actions");
require("./commands");
const factory_1 = require("./factory");
factory_1.commandsFactory('articles', 'get articles by filters and pages', 'ag', [['--page --pg <pageNo>', 'page number'],
    ['--per-page --pp <pageNo>', 'articles per page']]);
(process.argv.slice(2).length === 0)
    && globals_1.vorpal.show()
    || globals_1.vorpal.parse(process.argv);
