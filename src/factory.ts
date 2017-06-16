import { vorpal, logger } from './globals';

const TOption: [string, string];

const commandsFactory = (command: string, description?: string, alias?: string,
                         options?: TOption[], validationType?: string) => {
    const name: string = command.split(' ')[0];
    const commandObj = vorpal.command(command);
    description && commandObj.description(description);
    alias && commandObj.alias(alias);
    validationType && commandObj.validate( validationFactory(validationType));
    options && options.map(opt => {
        commandObj.option( opt.option, opt.description);
    });
    commandObj.action( actionFactory(name) );
};

const actionFactory = (name: string) => require(`./actions/${name}-action`).action;

const validationFactory = (type: string) => require(`./validations/${type}-validation`).validation;

export { commandsFactory };
