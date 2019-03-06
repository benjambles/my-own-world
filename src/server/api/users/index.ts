import * as Koa from 'koa';
import { cond, equals, F, path, T } from 'ramda';
import { isAdmin } from '../../utils/compares';
import { bindCheckAccess, bindOptions, getAuthenticatedUserId } from '../../utils/routes';
import * as identifierRoutes from './identifiers/routes';
import * as userRoutes from './routes';

const config = require('./config.json');

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export const routeHandlers = {
    ...userRoutes,
    ...identifierRoutes,
    sendOptions: bindOptions(config),
    checkAccess: bindCheckAccess(accessMap)
};

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 */
export function accessMap(ctx: Koa.Context): Function {
    return cond([
        [equals('role:admin'), () => isAdmin(ctx.state)],
        [equals('role:owner'), () => isCurrentUser(ctx.state)],
        [T, F]
    ]);
}

/**
 * Checks to see if the user making the request is the target of the request
 * @param ctx - A Koa context object
 */
export function isCurrentUser(ctx: Koa.Context): boolean {
    const requestUuid = getRequestedUser(ctx);
    if (!requestUuid) return true; // No user was needed
    const uuid = getAuthenticatedUserId(ctx);
    return uuid ? uuid === requestUuid : false; // No logged in user
}

/**
 * Grab the user UUID from the URL
 * @param ctx
 */
export function getRequestedUser(ctx: Koa.Context): any {
    return path(['request', 'params', 'userId'], ctx);
}
