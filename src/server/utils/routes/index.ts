import * as Koa from 'koa';

import { isAdmin, isTrue, isUser } from '../../utils';
import { NODE_ENV, responseStatuses } from '../config';

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 * @returns {boolean}
 */
export function baseAccessMap(ctx) {
    return role => {
        switch (role) {
            case 'role:admin':
                return isAdmin(ctx.state);
            case 'role:user':
                return isUser(ctx.state);
            default:
                return false; // role unrelated to these routes, assume no access
        }
    };
}

export function bindCheckAccess(accessMap?: any): Function {
    const map = accessMap;
    /**
     * Throwns an error if the users system roles and access rights don't match requirements
     * @param {Koa.Context} ctx - A Koa context object
     * @param {Function} next - Following Koa Middleware
     */
    return async function checkAccess(ctx: Koa.Context, next: Function): Promise<void> {
        const roles = ctx.state.accessRoles || [];

        if (roles.length) {
            const hasAccess: boolean = roles.map(map(ctx)).some(isTrue);

            if (!hasAccess) {
                ctx.throw(401, 'Unauthorised access to endpoint');
            }
        }
    };
}

/**
 * Returns a middleware for generating OPTIONS and returning the swagger conf for the given route to the browser
 * @param config Configs for the given route
 */
export function bindOptions(config): Function {
    /**
     * Return the options and config for the route
     * @route [OPTIONS] /users
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async function sendOptions(ctx: Koa.Context, next: Function): Promise<void> {
        const error = { message: 'There was an error whilst generating options', status: 400 };
        await next();
        await send(ctx, error, async function() {
            const pathParts = ctx.state.route.path.split('/').filter(part => part !== '');
            const response = Object.assign({}, findRouteConfig(config, pathParts));
            delete response.verbs.options;
            const verbs = Object.keys(response.verbs);

            if (verbs.includes('get')) {
                verbs.push('head');
            }

            ctx.set('Allow', verbs.join(', ').toUpperCase());

            return { data: response };
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
 *
 * @param config
 * @param pathParts
 */
function findRouteConfig(config: any, pathParts: string[]) {
    if (
        !pathParts.length ||
        typeof config.paths === 'undefined' ||
        (pathParts.length === 1 && config.route === `/${pathParts[0]}`)
    ) {
        return config;
    }

    const newConfig = config.paths.filter(path => path.route === `/${pathParts[0]}`)[0];
    const newPathParts = [pathParts.slice(0, 2).join('/')].concat(pathParts.slice(2));

    return findRouteConfig(newConfig, newPathParts);
}

/**
 * Builds a formatted API response and returns it to the middleware stack
 * @param ctx A Koa context
 * @param response Additional parameters to append to the response meta object
 */
function sendAPIResponse(ctx: Koa.Context, response): void {
    const status = response.status || 200;
    let responseData = response.data || undefined;

    if (response && response.parts) {
        responseData = {
            meta: buildMeta(response.parts[1] || {}, { status, message: responseStatuses.success }),
            body: response.parts[0]
        };
    }

    ctx.status = status;
    ctx.body = responseData;
}

/**
 *
 * @param ctx Koa Context
 * @param error A JS, or http-errors error object
 * @param safe Default error parameters for when an error isn't sent, or to hide dev errors
 */
function sendError(ctx, error, safe = { message: '', status: 400 }) {
    let { status = safe.status, message = safe.message } = error;

    if (NODE_ENV === 'production') {
        status = safe.status;
        message = safe.message;
    }

    ctx.throw(status, message);
}

/**
 * Builds a meta object that provides not data information about the response
 * @param meta Additional parameters to append to the response meta object
 * @param body Additional parameters to append to the response body object
 */
function buildMeta(meta: APIMeta, additionalData): APIMeta {
    const newMeta = Object.assign({}, meta, additionalData);
    return newMeta;
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
): Function {
    /**
     * Get a user and return it's data object
     * @param {Koa.Context} ctx - A Koa context object
     * @param {Function} next - Following Koa Middleware
     * @returns {Promise<void>}
     */
    return async function getUserById(ctx: Koa.Context, next: Function): Promise<void> {
        if (typeof setup === 'function') await setup(ctx);
        await next();
        await send(ctx, defaultError, response);
    };
}
