import { DotenvParseOutput } from 'dotenv/types';
import type Koa from 'koa';
import koaJoiRouter from 'koa-joi-router';

export type KoaContext = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>;
interface ProcessEnv {
    port: number;
    host: string;
    nodeEnv: string;
}

interface BootHandlerOpts {
    app: Koa;
    isApi: boolean;
    errorHandler: (error: Error) => void;
    middleware: Koa.Middleware[];
    env: DotenvParseOutput;
}

/**
 * Standard application runner flow
 * @param param0
 */
export function boot({ app, isApi, errorHandler, middleware, env }: BootHandlerOpts) {
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
}

/**
 *
 * @param process
 */
function getEnvParams(env: DotenvParseOutput): ProcessEnv {
    return {
        nodeEnv: env.NODE_ENV ?? 'development',
        host: env.HOST ?? '0.0.0.0',
        port: parseInt(env.PORT, 10) ?? NaN,
    };
}

/**
 * Ensures the the required parameters for a basic app to boot exist in
 * the node environment
 *
 * @param envParams
 */
function validateEnvParams(envParams: ProcessEnv) {
    const { Joi } = koaJoiRouter;

    return Joi.object({
        nodeEnv: Joi.string()
            .pattern(/^development|staging|production|testing&/)
            .required(),
        host: Joi.string()
            .ip({ version: ['ipv4', 'ipv6'] })
            .required(),
        port: Joi.number().port().required(),
    }).validate(envParams);
}
