import type { KoaContext } from '@benjambles/mow-server/dist/koa/app.js';
import { getAccessChecker } from '../../utils/middleware/get-access-checker.js';
import { bindOptions } from '../../utils/routes/bind-options.js';
import { getAccessMap } from '../../utils/security/get-access-map.js';
import { getAuthenticatedUserId } from '../../utils/security/get-authenticated-user-id.js';
import userConfig from './config.json' assert { type: 'json' };
import * as identifierRoutes from './identifiers/routes.js';
import * as userRoutes from './routes.js';

export const config = userConfig;

/**
 * Map of functions to test against roles for granting access to endpoints
 * @param ctx Koa context object
 */
export const accessMap = getAccessMap({ 'role:owner': (ctx) => isCurrentUser(ctx) });

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export const routeHandlers = {
    ...userRoutes,
    ...identifierRoutes,
    sendOptions: bindOptions(config),
    checkAccess: getAccessChecker(accessMap),
};

/**
 * Checks to see if the user making the request is the target of the request
 * @param ctx - A Koa context object
 */
export function isCurrentUser(ctx: KoaContext): boolean {
    const requestUuid = getRequestedUser(ctx);
    if (!requestUuid) return true; // No user was needed

    const uuid = getAuthenticatedUserId(ctx);

    return uuid ? uuid === requestUuid : false; // No logged in user
}

/**
 * Grab the user UUID from the URL
 * @param ctx
 */
export function getRequestedUser(ctx: KoaContext): string {
    return ctx.request.params.userId;
}
