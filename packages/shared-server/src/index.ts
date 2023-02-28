import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import router, { Spec } from 'koa-joi-router';
import { getMiddleware } from './koa/get-middleware.js';
interface BootHandlerOpts {
    app: Koa;
    config: {
        env: { HOST: string; JWT_SECRET: string; PORT: string };
        isApi: boolean;
        helmetConfig?: any;
        staticPath?: Record<string, string>;
    };
    routes?: Koa.Middleware[];
    routesConfig?: Spec[];
}

/**
 * Standard application runner flow
 * @param param0
 */
export function configureServer({
    app,
    config: { env, helmetConfig, isApi = false, staticPath },
    routes,
    routesConfig,
}: BootHandlerOpts) {
    // specify that this is our api
    app.context.api = isApi;

    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    getMiddleware({
        app,
        env,
        helmetConfig,
        staticPath,
    }).forEach((middleware: Koa.Middleware) => app.use(middleware));

    if (routesConfig) {
        app.use(router().route(routesConfig).middleware());
    }

    if (routes) {
        routes.forEach((route) => app.use(route));
    }

    return ({ HOST, PORT } = env) => {
        return app.listen(parseInt(PORT, 10), HOST, () => {
            console.log('Listening on %s:%s', HOST, PORT);
        });
    };
}
