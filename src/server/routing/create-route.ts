import * as router from 'koa-joi-router';

export default function createRoute(prefix: string) {
    return routeMap =>
        router()
            .route(routeMap)
            .prefix(`/${prefix}`);
}
