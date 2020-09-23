import router from 'koa-joi-router';
import { curry } from 'ramda';

/**
 * Return a Koa joi router route
 * @param prefix - First part of the given route.
 */
export const createRoute = curry((prefix: string, routeMap) => {
    return router().route(routeMap).prefix(`/${prefix}`);
});
