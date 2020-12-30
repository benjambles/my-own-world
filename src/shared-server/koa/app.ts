import { Joi } from 'koa-joi-router';
import { DotenvParseOutput } from 'dotenv/types';
import Koa, { DefaultContext, DefaultState, Middleware, ParameterizedContext } from 'koa';
import { propOr } from 'ramda';

export type KoaContext = ParameterizedContext<DefaultState, DefaultContext>;

interface ProcessEnv {
    port: number;
    host: string;
    nodeEnv: string;
}

interface BootHandlerOpts {
    app: Koa;
    isApi: boolean;
    errorHandler: (error: Error) => void;
    middleware: Middleware[];
    env: DotenvParseOutput;
}

/**
 * Standard application runner flow
 * @param param0
 */
export const boot = ({ app, isApi, errorHandler, middleware, env }: BootHandlerOpts) => {
    const envParams = getEnvParams(env);
    const { error, value } = validateEnvParams(envParams);

    if (error) {
        throw error;
    }

    const { port, host } = value;

    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = isApi;

    app.context.env = env;

    middleware.forEach((fn) => app.use(fn));

    app.listen(port, host, (): void => {
        console.log('Listening on %s:%s', host, port);
    });
};

/**
 *
 * @param process
 */
const getEnvParams = (env: DotenvParseOutput): ProcessEnv => {
    return {
        nodeEnv: propOr('development', 'NODE_ENV', env),
        host: propOr('0.0.0.0', 'HOST', env),
        port: propOr(NaN, 'PORT', env),
    };
};

/**
 * Ensures the the required parameters for a basic app to boot exist in
 * the node environment
 *
 * @param envParams
 */
const validateEnvParams = (envParams: ProcessEnv) => {
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
