import * as Koa from 'koa';
import * as R from 'ramda';
import { isFunction, isTruthy } from 'ramda-adjunct';
import { NODE_ENV, responseStatuses } from '../../config';
import getStringParts from '../array/get-string-parts';
import wrap from '../array/wrap';
import isAdmin from '../compares/is-admin';
import isUser from '../compares/is-user';
import maybeProp from '../functional/maybe-prop';
import { dataResponse } from './responses';

const getRoute = R.prop('route');

/**
 * Recursively search config tree to find the configuration for a given route
 * @param {object} config - The configuration for a set of routes
 * @param {string[]} pathParts - route path steps (pathname split on /)
 */
const findRouteConfig = (config: any, pathParts: string[]) => {
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

    return findRouteConfig(newConfig, newPathParts);
};

/**
 * Checks to see if the given route parts are the current root of the API
 * @param pathParts
 */
const getBasePathFilter = (pathParts: string[]): ((data: object | object[]) => object) => {
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
};

/**
 * Throw an error that is safe in each environment context to the errorHandler
 * @param ctx Koa Context
 * @param error A JS, or http-errors error object
 * @param safe Default error parameters for when an error isn't sent, or to hide dev errors
 */
export const sendError = (ctx: Koa.Context, error, safe = { message: '', status: 400 }) => {
    if (NODE_ENV === 'production') {
        ctx.throw(R.props(['status', 'message'], safe));
    }

    const { status = safe.status, message = safe.message } = error;
    ctx.throw(status, message);
};

/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export const getAuthenticatedUserId = (ctx: Koa.Context): string =>
    R.path(['state', 'user', 'uuid'], ctx);

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 */
export const getAccessMap = (additionalChecks = []) => (ctx: Koa.Context): Function =>
    R.cond([
        [R.equals('role:admin'), () => isAdmin(ctx)],
        [R.equals('role:user'), () => isUser(ctx)],
        ...additionalChecks,
        [R.T, R.F]
    ]);

/**
 * Returns a middleware that prevents users from accessing areas of the API based on their roles
 * and the security map for the route
 * @param accessMap
 */
export const bindCheckAccess = (accessMap?: any): Koa.Middleware => {
    /**
     * Throwns an error if the users system roles and access rights don't match requirements
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async (ctx, next) => {
        R.when(isTruthy, () => {
            const roles = R.pathOr([], ['state', 'accessRoles'], ctx) as string[];
            const hasAccess = roles.some(accessMap(ctx));

            if (roles.length && !hasAccess) ctx.throw(401, 'Unauthorised access to endpoint');
        })(accessMap);

        await next();
    };
};

/**
 * Returns a middleware for generating OPTIONS and returning the swagger conf for the given route to the browser
 * @param config Configs for the given route
 */
export const bindOptions = (config): Koa.Middleware => {
    /**
     * Return the options and config for the route
     * @route [OPTIONS]
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async (ctx: Koa.Context, next) => {
        const error = { message: 'There was an error whilst generating options', status: 400 };
        await next();
        await send(ctx, error, async () => {
            const pathParts = getStringParts('/', getRoute(ctx.state));
            const response = findRouteConfig(config, pathParts);

            ctx.set(
                'Allow',
                Object.keys(response.verbs)
                    .reduce(
                        (acc, key) =>
                            R.cond([
                                [R.equals('options'), R.always(acc)],
                                [R.equals('get'), key => R.concat(acc, [key, 'head'])],
                                [R.T, R.concat(acc)]
                            ])(key),
                        []
                    )
                    .join(', ')
                    .toUpperCase()
            );

            return dataResponse(response);
        });
    };
};

/**
 * Sends an api response where possible, and handles sending clean errors when thrown.
 * @param ctx A Koa context
 * @param error Default error parameters for when an error isn't sent, or to hide dev errors
 * @param data A function that generates the response data
 */
export const send = async (ctx: Koa.Context, error: iError, data: Function): Promise<void> => {
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
};

/**
 * Utility function for creating route middleware that allows for setup and response stages.
 * @param defaultError - Error to throw when an uncaught exception is thrown
 * @param response - Async function taking a koa context as an argument that responds to a request
 * @param setup - Async function taking a koa context as an argument that can be used to add pre-response checks
 */
export const generateRoute = (
    defaultError: any,
    response: Function,
    setup: Function | null = null
): Koa.Middleware => {
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
};
