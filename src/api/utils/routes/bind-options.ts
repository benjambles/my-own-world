import { RouteHandler } from '../../routing/spec-parsing/get-route-middleware';
import { getRouteConfig } from './get-route-config';
import { dataResponse } from './responses';

/**
 * Returns a middleware for generating OPTIONS and returning
 * the swagger conf for the given route to the browser
 */
export const bindOptions = (routeConfig): RouteHandler => {
    const defaultError = {
        message: 'There was an error whilst generating options',
        status: 400,
    };

    /**
     * Return the options and config for the route
     * @route [OPTIONS]
     */
    return (send) => {
        return async (ctx) => {
            await send(ctx, defaultError, async (ctx) => {
                const response = getRouteConfig(routeConfig, ctx.state);

                ctx.set(
                    'Allow',
                    Object.keys(response.verbs).reduce(getHTTPMethods, []).join(', ').toUpperCase(),
                );

                return dataResponse(response);
            });
        };
    };
};

/**
 *
 * @param acc
 * @param key
 */
const getHTTPMethods = (acc: string[], key: string): string[] => {
    if (key === 'options') return acc;
    if (key === 'get') return acc.concat('get', 'head');
    return acc.concat(key);
};
