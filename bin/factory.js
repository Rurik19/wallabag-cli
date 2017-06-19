"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
const commandsFactory = (command, description, alias, options, validationType) => {
    const name = command.split(' ')[0];
    const commandObj = globals_1.vorpal.command(command);
    description && commandObj.description(description);
    alias && commandObj.alias(alias);
    validationType && commandObj.validate(validationFactory(validationType));
    options && options.map(opt => {
        commandObj.option(opt[0], opt[1]);
    });
    commandObj.action(actionFactory(name));
};
exports.commandsFactory = commandsFactory;
const actionFactory = (name) => require(`./actions/${name}-action`).action;
const validationFactory = (type) => require(`./validations/${type}-validation`).validation;
