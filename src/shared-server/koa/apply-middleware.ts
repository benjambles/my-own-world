import Koa from 'koa';

/**
 * Initialize an app
 * @api public
 */
export const applyMiddleware = ({ app, errorHandler, getMiddleware, isApi = false }): Koa => {
    // override koa's undocumented error handler
    app.context.onerror = errorHandler;

    // specify that this is our api
    app.context.api = isApi;

    getMiddleware(app).forEach((fn) => app.use(fn));

    return app;
};
