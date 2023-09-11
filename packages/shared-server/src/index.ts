import Koa, { Middleware } from 'koa';
import { getMiddleware } from './koa/get-middleware.js';
import { createServer } from 'http';
interface BootHandlerOpts {
    app: Koa;
    cleanUp: (abortController: AbortController) => Promise<void>;
    config: {
        corsConfig?: { origin: string };
        env: { HOST: string; JWT_SECRET: string; PORT: string };
        helmetConfig?: any;
        isApi: boolean;
        staticPaths?: Record<string, string>;
    };
    customErrorHandler: Middleware;
    routes?: Koa.Middleware[];
}

/**
 * Standard application runner flow
 * @param param0
 */
export function configureServer({
    app,
    config: { corsConfig, env, helmetConfig, isApi = false, staticPaths },
    cleanUp,
    customErrorHandler,
    routes,
}: BootHandlerOpts) {
    // specify that this is our api
    app.context.api = isApi;

    // Set the env on the base context object for later use
    app.context.env = env;

    getMiddleware({
        corsConfig,
        customErrorHandler,
        env,
        helmetConfig,
        isApi,
        staticPaths,
    }).forEach((middleware: Koa.Middleware) => app.use(middleware));

    routes?.forEach((route) => app.use(route));

    return ({ HOST, PORT } = env) => {
        const server = createServer(app.callback());
        const abortController = new AbortController();

        process.on('SIGINT', () => cleanUp(abortController));
        process.on('SIGTERM', () => cleanUp(abortController));

        return server.listen(
            {
                host: HOST,
                port: parseInt(PORT, 10),
                signal: abortController.signal,
            },
            () => {
                console.log('Listening on %s:%s', HOST, PORT);
            },
        );
    };
}

export async function cleanUp(abortController: AbortController) {
    console.log('Closing...');
    abortController.abort();
}
