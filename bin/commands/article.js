"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("../globals");
const id_validation_1 = require("../validations/id-validation");
const article_action_1 = require("../actions/article-action");
(() => globals_1.vorpal
    .command('article [id]', 'gets article by ID or the last one')
    .validate(id_validation_1.validate)
    .action(article_action_1.action))();
