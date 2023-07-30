import Koa, { Middleware } from 'koa';
import { getMiddleware } from './koa/get-middleware.js';
interface BootHandlerOpts {
    app: Koa;
    config: {
        env: { HOST: string; JWT_SECRET: string; PORT: string };
        isApi: boolean;
        helmetConfig?: any;
        staticPaths?: Record<string, string>;
    };
    routes?: Koa.Middleware[];
    customErrorHandler: Middleware;
}

/**
 * Standard application runner flow
 * @param param0
 */
export function configureServer({
    app,
    config: { env, helmetConfig, isApi = false, staticPaths },
    routes,
    customErrorHandler,
}: BootHandlerOpts) {
    // specify that this is our api
    app.context.api = isApi;

    // Set the env on the base context object for later use
    app.context.env = env;

    getMiddleware({
        env,
        helmetConfig,
        staticPaths,
        customErrorHandler,
    }).forEach((middleware: Koa.Middleware) => app.use(middleware));

    routes?.forEach((route) => app.use(route));

    return ({ HOST, PORT } = env) => {
        return app.listen(parseInt(PORT, 10), HOST, () => {
            console.log('Listening on %s:%s', HOST, PORT);
        });
    };
}
