import { DotenvParseOutput } from 'dotenv/types';
import type Koa from 'koa';
import errorHandler from 'koa-better-error-handler';
import router, { Spec } from 'koa-joi-router';
import { getMiddleware } from './get-middleware.js';

export type KoaContext = Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>;

interface BootHandlerOpts {
    app: Koa;
    config: {
        isApi: boolean;
        helmetConfig?: any;
        staticPath?: string;
    };
    routes?: Koa.Middleware[];
    routesConfig?: Spec[];
    env: DotenvParseOutput;
}

/**
 * Standard application runner flow
 * @param param0
 */
export function boot({
    app,
    config: { staticPath, helmetConfig, isApi = false },
    routes,
    routesConfig,
    env,
}: BootHandlerOpts) {
    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = isApi;

    // Add env values to the context for use later
    // e.g. logging
    app.context.env = env;

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
        routes.forEach((route: Koa.Middleware) => app.use(route));
    }

    return () => {
        const { PORT, HOST } = env;

        return app.listen(parseInt(PORT, 10), HOST, () => {
            console.log('Listening on %s:%s', HOST, PORT);
        });
    };
}
