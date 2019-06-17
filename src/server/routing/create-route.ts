import * as router from 'koa-joi-router';

export default (prefix: string) => routeMap =>
    router()
        .route(routeMap)
        .prefix(`/${prefix}`);
