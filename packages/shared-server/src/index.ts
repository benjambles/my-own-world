import Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import router, { Spec } from 'koa-joi-router';
import { getMiddleware } from './koa/get-middleware.js';
interface BootHandlerOpts {
    app: Koa;
    config: {
        isApi: boolean;
        helmetConfig?: any;
        staticPath?: string;
        env: { PORT: string; HOST: string; JWT_SECRET: string };
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
    config: { staticPath, helmetConfig, isApi = false, env },
    routes,
    routesConfig,
}: BootHandlerOpts) {
    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = isApi;

    getMiddleware({
        app,
        env,
        staticPath,
        helmetConfig,
    }).forEach((middleware: Koa.Middleware) => app.use(middleware));

    if (routesConfig) {
        app.use(router().route(routesConfig).middleware());
    }

    if (routes) {
        routes.forEach((route) => app.use(route));
    }

    return ({ PORT, HOST } = env) => {
        return app.listen(parseInt(PORT, 10), HOST, () => {
            console.log('Listening on %s:%s', HOST, PORT);
        });
    };
}
