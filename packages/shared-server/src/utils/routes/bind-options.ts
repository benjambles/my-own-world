import { Middleware } from 'koa';
import { getRouteConfig } from './get-route-config.js';
import { getDataMiddleware } from './responses.js';

/**
 * Returns a middleware for generating OPTIONS and returning
 * the swagger conf for the given route to the browser
 */
export function bindOptions(routeConfig): Middleware {
    /**
     * Return the options and config for the route
     * @route [OPTIONS]
     */
    return getDataMiddleware(
        'There was an error whilst generating options',
        async (ctx) => {
            const response = getRouteConfig(routeConfig, ctx.state);

            ctx.set(
                'Allow',
                Object.keys(response.verbs)
                    .reduce(getHTTPMethods, [])
                    .join(', ')
                    .toUpperCase(),
            );

            return response;
        },
    );
}

/**
 *
 * @param acc
 * @param key
 */
function getHTTPMethods(acc: string[], key: string): string[] {
    if (key === 'options') return acc;
    if (key === 'get') return acc.concat('get', 'head');
    return acc.concat(key);
}
