import Joi from '@hapi/joi';
import Koa, { Middleware } from 'koa';
import { ifElse, pathOr, pipe, prop } from 'ramda';
import { applyMiddleware } from './apply-middleware';

type ListenOptions = {
    port: number;
    host: string;
    app: Koa;
};

type ProcessEnv = Pick<ListenOptions, 'port' | 'host'> & { nodeEnv: string };

type AppListener = (opts: ListenOptions) => void;

type BootHandlerOpts = {
    koa: Koa;
    isApi: boolean;
    errorHandler: Middleware;
    getMiddleware: (nodeEnv: string) => Middleware[];
    listener: AppListener;
};

type BootHandler = (opts: BootHandlerOpts) => (env: NodeJS.Process) => void;

/**
 *
 * @param param0
 * @param app
 */
export const listen: AppListener = ({ port, host, app }) => {
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
        port: pathOr(NaN, ['env', 'PORT'], env),
    };
};

/**
 * Ensures the the required parameters for a basic app to boot exist in
 * the node environment
 *
 * @param envParams
 */
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

/**
 * Standard application runner flow
 * @param param0
 */
export const boot: BootHandler = ({ koa, isApi, errorHandler, getMiddleware, listener }) => {
    return pipe(
        getEnvParams,
        validateEnvParams,
        ifElse(
            prop('error'),
            (joiObj) => {
                throw new Error(joiObj.error);
            },
            ({ value }) => {
                const { port, host } = value;
                const app = applyMiddleware({
                    errorHandler,
                    isApi,
                    app: koa,
                    middleware: getMiddleware(value.env),
                });
                listener({ port, host, app });
            },
        ),
    );
};
