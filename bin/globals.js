"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallabag_api_1 = require("wallabag-api");
const Vorpal = require("vorpal");
const vorpalLog = require("vorpal-log");
const api = new wallabag_api_1.WallabagApi();
exports.api = api;
const vorpal = new Vorpal();
exports.vorpal = vorpal;
vorpal
    .use(vorpalLog)
    .delimiter('wallabag$')
    .history('wallabag-cli')
    .localStorage('wallabag-cli');
const logger = vorpal.logger;
exports.logger = logger;
