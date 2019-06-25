import * as Koa from 'koa';
import * as R from 'ramda';
import { isFunction } from 'ramda-adjunct';
import { isProduction, responseStatuses } from '../../config';
import getStringParts from '../array/get-string-parts';
import wrap from '../array/wrap';
import { maybeProp } from '../functional/maybe-prop';
import { dataResponse } from './responses';

/**
 * Returns the route propterty of a given object
 * @param config
 */
const getRoute = R.prop('route');

/**
 * Returns a middleware for generating OPTIONS and returning
 * the swagger conf for the given route to the browser
 */
export function bindOptions(routeConfig): Koa.Middleware {
    const getRouteConfig = R.compose(
        findRouteConfig(routeConfig),
        getStringParts('/'),
        getRoute
    );
    /**
     * Return the options and config for the route
     * @route [OPTIONS]
     */
    return async (ctx: Koa.Context, next: () => Promise<any>) => {
        const error = { message: 'There was an error whilst generating options', status: 400 };
        await next();
        await send(ctx, error, async () => {
            const response = getRouteConfig(ctx.state);

            R.compose(
                R.partial(ctx.set, ['Allow']),
                R.toUpper,
                R.join(', '),
                R.reduce(getHTTPMethods, []),
                R.keys
            )(response.verbs);

            return dataResponse(response);
        });
    };
}

/**
 *
 * @param acc
 * @param key
 */
function getHTTPMethods(acc: string[], key: string): string[] {
    return R.cond([
        [R.equals('options'), R.always(acc)],
        [R.equals('get'), key => R.concat(acc, [key, 'head'])],
        [R.T, R.concat(acc)]
    ])(key);
}

/**
 * Utility function for creating route middleware that allows for setup and response stages.
 * @param defaultError - Error to throw when an uncaught exception is thrown
 * @param response - Async function taking a koa context as an argument that responds to a request
 * @param setup - Async function taking a koa context as an argument that can be used to add pre-response checks
 */
export function generateRoute(
    defaultError: any,
    response: Function,
    setup: Function | null = null
): Koa.Middleware {
    /**
     * A Koa middleware that handles setup and teardown of a route
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async (ctx: Koa.Context, next) => {
        if (isFunction(setup)) await setup(ctx);
        await next();
        await send(ctx, defaultError, response);
    };
}

/**
 * Recursively search config tree to find the configuration for a given route
 * @param {object} config - The configuration for a set of routes
 * @param {string[]} pathParts - route path steps (pathname split on /)
 */
function findRouteConfig(config: any) {
    return (pathParts: string[]) => {
        const getBasePath = getBasePathFilter(pathParts);

        if (
            !pathParts.length ||
            R.isNil(config.paths) ||
            (pathParts.length === 1 && getBasePath(config))
        ) {
            return config;
        }

        const newConfig = getBasePath(config.paths);
        const newPathParts = [pathParts.slice(0, 2).join('/')].concat(pathParts.slice(2));

        return findRouteConfig(newConfig)(newPathParts);
    };
}

/**
 * Checks to see if the given route parts are the current root of the API
 * @param pathParts
 */
function getBasePathFilter(pathParts: string[]): (data: object | object[]) => object {
    return R.compose(
        R.head,
        R.filter(
            R.compose(
                R.equals(`/${R.propOr('', 0, pathParts)}`),
                getRoute
            )
        ),
        wrap
    );
}

/**
 * Sends an api response where possible, and handles sending clean errors when thrown.
 * @param ctx - A Koa context
 * @param error - Default error parameters for when an error isn't sent, or to hide dev errors
 * @param data - A function that generates the response data
 */
async function send(ctx: Koa.Context, error: iError, data: Function): Promise<void> {
    try {
        const response: ApiResponse = await data(ctx);
        const status = R.propOr(200, 'status', response);

        ctx.status = status;
        ctx.body = maybeProp('parts', response).foldL(
            () => R.propOr('', 'data', response),
            ({ meta = {}, body = {} }) => ({
                meta: {
                    ...meta,
                    status,
                    message: responseStatuses.success
                },
                body
            })
        );
    } catch (e) {
        sendError(ctx, e, error);
    }
}

/**
 * Throw an error that is safe in each environment context to the errorHandler
 * @param ctx - Koa Context
 * @param error - A JS, or http-errors error object
 * @param safe - Default error parameters for when an error isn't sent, or to hide dev errors
 */
function sendError(ctx: Koa.Context, error, safe = { message: '', status: 400 }): void {
    if (isProduction()) {
        ctx.throw(R.props(['status', 'message'], safe));
    }

    const { status = safe.status, message = safe.message } = error;
    ctx.throw(status, message);
}
