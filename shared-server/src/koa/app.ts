import Koa from 'koa';
import { pathOr } from 'ramda';
import Joi from '@hapi/joi';

type ListenOptions = {
    port: number;
    host: string;
    app: Koa;
};

type ProcessEnv = Pick<ListenOptions, 'port' | 'host'> & { nodeEnv: string };

/**
 *
 * @param param0
 * @param app
 */
export const listen = ({ port, host, app }: ListenOptions): void => {
    app.listen(port, host, (): void => {
        console.log('Listening on %s:%s', host, port);
    });
};

/**
 *
 * @param process
 */
export const getEnvParams = (env: NodeJS.Process): ProcessEnv => {
    return {
        nodeEnv: pathOr('development', ['env', 'NODE_ENV'], env),
        host: pathOr('0.0.0.0', ['env', 'HOST'], env),
        port: pathOr(3001, ['env', 'PORT'], env),
    };
};

export const validateEnvParams = (envParams: ProcessEnv) => {
    const schema = Joi.object({
        nodeEnv: Joi.string()
            .pattern(/^development|staging|production|testing&/)
            .required(),
        host: Joi.string()
            .ip({ version: ['ipv4', 'ipv6'] })
            .required(),
        port: Joi.number().port().required(),
    });

    return schema.validate(envParams);
};
