import { config } from 'dotenv';
import { DotenvParseOutput } from 'dotenv/types';
import type Koa from 'koa';
import { resolveImportPath } from '../utils/paths.js';

export type KoaContext = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>;

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
    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = isApi;

    app.context.env = env;

    middleware.forEach((fn) => app.use(fn));

    return () => {
        const { PORT, HOST } = env;

        return app.listen(parseInt(PORT, 10), HOST, () => {
            console.log('Listening on %s:%s', HOST, PORT);
        });
    };
}

export function parseEnvFile(validator, paths) {
    const env = config({ path: resolveImportPath(paths.base, paths.env) }).parsed;

    const { error, value } = validator(env);

    if (error) {
        throw error;
    }

    return value;
}
