import * as router from 'koa-joi-router';

export default (prefix: string) => (routeMap): iRouter => {
    return router()
        .route(routeMap)
        .prefix(`/${prefix}`);
};
