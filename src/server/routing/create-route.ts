import * as router from 'koa-joi-router';

export default prefix => routeMap =>
    router()
        .route(routeMap)
        .prefix(`/${prefix}`);
