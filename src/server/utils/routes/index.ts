import * as Koa from 'koa';
import * as R from 'ramda';
import { isAdmin, isTrue, isUser } from '../compares';
import { NODE_ENV, responseStatuses } from '../config';

const getRoute = R.prop('route');

/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export function getAuthenticatedUserId(ctx: Koa.Context): any {
    return R.path(['state', 'user', 'uuid'], ctx);
}

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 */
export function baseAccessMap(ctx: Koa.Context): Function {
    return R.cond([
        [R.equals('role:admin'), () => isAdmin(ctx.state)],
        [R.equals('role:user'), () => isUser(ctx.state)],
        [R.T, R.F]
    ]);
}

/**
 * Returns a middleware that prevents users from accessing areas of the API based on their roles
 * and the security map for the route
 * @param accessMap
 */
export function bindCheckAccess(accessMap?: any): Koa.Middleware {
    /**
     * Throwns an error if the users system roles and access rights don't match requirements
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async function checkAccess(ctx: Koa.Context, next): Promise<void> {
        if (!accessMap) return;

        const roles = R.pathOr([], ['state', 'accessRoles'], ctx) as string[];
        const hasAccess = roles.some(accessMap(ctx));

        if (roles.length && !hasAccess) ctx.throw(401, 'Unauthorised access to endpoint');
        await next();
    };
}

/**
 * Returns a middleware for generating OPTIONS and returning the swagger conf for the given route to the browser
 * @param config Configs for the given route
 */
export function bindOptions(config): Koa.Middleware {
    /**
     * Return the options and config for the route
     * @route [OPTIONS] /users
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async function sendOptions(ctx: Koa.Context, next): Promise<void> {
        const error = { message: 'There was an error whilst generating options', status: 400 };
        await next();
        await send(ctx, error, async function() {
            const pathParts = getRoute(ctx.state)
                .path.split('/')
                .filter(isTrue);
            const response = R.dissocPath(['verbs', 'options'], findRouteConfig(config, pathParts));
            const verbs = Object.keys(response.verbs);

            if (verbs.includes('get')) {
                verbs.push('head');
            }

            ctx.set('Allow', verbs.join(', ').toUpperCase());

            return dataResponse(response);
        });
    };
}

/**
 * Sends an api response where possible, and handles sending clean errors when thrown.
 * @param ctx A Koa context
 * @param error Default error parameters for when an error isn't sent, or to hide dev errors
 * @param data A function that generates the response data
 */
export async function send(ctx: Koa.Context, error: iError, data: Function): Promise<void> {
    try {
        const message = await data(ctx);
        sendAPIResponse(ctx, message);
    } catch (e) {
        sendError(ctx, e, error);
    }
}

/**
 * Structures an API response
 * @param {object} body - The content of the response
 * @param {object} meta - Useful information pertaining to the response
 */
export function partsResponse(body = {}, meta = {}): ApiResponse {
    return {
        parts: {
            body,
            meta
        }
    };
}

/**
 * Structure for a response that should be just sent as is
 * @param {object} data
 */
export function dataResponse(data): ApiResponse {
    return { data };
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
     * Get a user and return it's data object
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async function getUserById(ctx: Koa.Context, next): Promise<void> {
        if (typeof setup === 'function') await setup(ctx);
        await next();
        await send(ctx, defaultError, response);
    };
}

/**
 * Recursively search config tree to find the configuration for a given route
 * @param {object} config - The configuration for a set of routes
 * @param {string[]} pathParts - route path steps (pathname split on /)
 */
function findRouteConfig(config: any, pathParts: string[]) {
    const isBasePath = R.compose(
        R.equals(`/${R.propOr('', 0, pathParts)}`),
        getRoute
    );
    if (
        !pathParts.length ||
        !R.isNil(config.paths) ||
        (pathParts.length === 1 && isBasePath(config))
    ) {
        return config;
    }

    const newConfig = R.head(R.filter(isBasePath, config.paths));
    const newPathParts = [pathParts.slice(0, 2).join('/')].concat(pathParts.slice(2));

    return findRouteConfig(newConfig, newPathParts);
}

/**
 * Builds a formatted API response and returns it to the middleware stack
 * @param ctx A Koa context
 * @param response Additional parameters to append to the response meta object
 */
function sendAPIResponse(ctx: Koa.Context, response: ApiResponse): void {
    const status = R.propOr(200, 'status', response);
    const { parts, data } = response;

    ctx.status = status;

    if (parts) {
        ctx.body = {
            meta: {
                ...parts.meta,
                status,
                message: responseStatuses.success
            },
            body: parts.body
        };
    } else {
        ctx.body = data;
    }
}

/**
 * Throw an error that is safe in each environment context to the errorHandler
 * @param ctx Koa Context
 * @param error A JS, or http-errors error object
 * @param safe Default error parameters for when an error isn't sent, or to hide dev errors
 */
function sendError(ctx: Koa.Context, error, safe = { message: '', status: 400 }) {
    let { status = safe.status, message = safe.message } = error;

    if (NODE_ENV === 'production') {
        status = safe.status;
        message = safe.message;
    }

    ctx.throw(status, message);
}
