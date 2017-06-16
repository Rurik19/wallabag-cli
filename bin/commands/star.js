"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const id_validation_1 = require("../validations/id-validation");
const star_action_1 = require("../actions/star-action");
(() => globals_1.vorpal
    .command('star [id]', 'star article by ID or the last one')
    .option('--drop', 'clear star mark')
    .validate(id_validation_1.validate)
    .action(star_action_1.action))();
