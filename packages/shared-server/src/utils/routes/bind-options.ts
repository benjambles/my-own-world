import { RouteHandler } from '../../routing/spec-parsing/get-route-middleware.js';
import { getRouteConfig } from './get-route-config.js';
import { getDataMiddleware } from './responses.js';

/**
 * Returns a middleware for generating OPTIONS and returning
 * the swagger conf for the given route to the browser
 */
export function bindOptions(routeConfig): RouteHandler {
    const defaultError = {
        message: 'There was an error whilst generating options',
        status: 400,
    };

    /**
     * Return the options and config for the route
     * @route [OPTIONS]
     */
    return () => {
        return getDataMiddleware(defaultError, async (ctx) => {
            const response = getRouteConfig(routeConfig, ctx.state);

            ctx.set(
                'Allow',
                Object.keys(response.verbs).reduce(getHTTPMethods, []).join(', ').toUpperCase(),
            );

            return response;
        });
    };
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
