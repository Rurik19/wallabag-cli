"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const id_validation_1 = require("../validations/id-validation");
const archive_action_1 = require("../actions/archive-action");
(() => globals_1.vorpal
    .command('arch [id]', 'archive article by ID or the last one')
    .option('--drop', 'clear archive mark')
    .validate(id_validation_1.validate)
    .action(archive_action_1.action))();
