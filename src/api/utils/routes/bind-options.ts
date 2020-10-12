import { Middleware } from 'koa';
import * as R from 'ramda';
import { getRouteConfig } from './get-route-config';
import { dataResponse } from './responses';
import { send } from './send';

/**
 * Returns a middleware for generating OPTIONS and returning
 * the swagger conf for the given route to the browser
 */
export const bindOptions = (routeConfig): Middleware => {
    /**
     * Return the options and config for the route
     * @route [OPTIONS]
     */
    return async (ctx, next) => {
        const error = {
            message: 'There was an error whilst generating options',
            status: 400,
        };
        await next();

        await send(ctx, error, async () => {
            const response = getRouteConfig(routeConfig)(ctx.state);

            R.compose(
                R.partial(ctx.set, ['Allow']),
                R.toUpper,
                R.join(', '),
                R.reduce(getHTTPMethods, []),
                R.keys,
            )(response.verbs);

            return dataResponse(response);
        });
    };
};

/**
 *
 * @param acc
 * @param key
 */
const getHTTPMethods = (acc: string[], key: string): string[] => {
    return R.cond([
        [R.equals('options'), R.always(acc)],
        [R.equals('get'), () => acc.concat('get', 'head')],
        [R.T, (key) => acc.concat(key)],
    ])(key);
};
