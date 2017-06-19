import { vorpal, logger } from './globals';

type IOption = [string, string];

const commandsFactory = (command: string, description?: string, alias?: string,
                         options?: IOption[], validationType?: string) => {
    const name: string = command.split(' ')[0];
    const commandObj = vorpal.command(command);
    description && commandObj.description(description);
    alias && commandObj.alias(alias);
    validationType && commandObj.validate( validationFactory(validationType));
    options && options.map(opt => {
        commandObj.option( opt[0], opt[1]);
    });
    commandObj.action( actionFactory(name) );
};

const actionFactory = (name: string) => require(`./actions/${name}-action`).action;

const validationFactory = (type: string) => require(`./validations/${type}-validation`).validation;

export { commandsFactory, IOption };
