"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factory_1 = require("../factory");
factory_1.commandsFactory('articles', 'get articles by filters and pages', 'ag', [['-pg, --page <pageNo>', 'page number'],
    ['-pp --perPage <perPage>', 'articles per page'],
    ['--starred', 'filter srarred articles'],
    ['--archived', 'filter archived articles'],
    ['-t, --tags <tags>', 'filter by taglist'],
    ['--sort <order>', 'sort order: created or updated, default: created'],
    ['--order <order>', 'order of sort: asc or desc, default: desc']]);
