import * as Koa from 'koa';
import { equals, path } from 'ramda';
import { getAccessChecker } from '../../utils/middleware/get-access-checker';
import { bindOptions } from '../../utils/routes';
import getAccessMap from '../../utils/security/get-access-map';
import getAuthenticatedUserId from '../../utils/security/get-authenticated-user-id';
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
    checkAccess: getAccessChecker(accessMap)
};

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 */
export function accessMap(ctx: Koa.Context): Function {
    return getAccessMap([[equals('role:owner'), () => isCurrentUser(ctx)]])(ctx);
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
export function getRequestedUser(ctx: Koa.Context): string {
    return path(['request', 'params', 'userId'], ctx);
}
