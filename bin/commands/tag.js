"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const tag_validate_1 = require("../validations/tag-validate");
const tag_action_1 = require("../actions/tag-action");
(() => globals_1.vorpal
    .command('tag [id]', 'set tags fot article by ID or the last one')
    .option('--add <tagList>', 'add tags')
    .option('--drop <tagList>', 'remove tags')
    .validate(tag_validate_1.validate)
    .action(tag_action_1.action))();
