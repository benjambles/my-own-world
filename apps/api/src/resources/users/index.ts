import { KoaContext } from '@benjambles/mow-server/dist/koa/app.js';
import { getAuthenticatedUserId } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import config from './config.json' assert { type: 'json' };
import * as identifierRoutes from './identifiers/routes.js';
import * as userRoutes from './routes.js';

/**
 * Routes on /users and /users/*
 * Special auth routes under: /authentication
 */
export default {
    config,
    accessMap: 
        { 'role:owner': (ctx) => isCurrentUser(ctx) }
    ,
    routeHandlers: {
        ...userRoutes,
        ...identifierRoutes,
    }
};

/**
 * Checks to see if the user making the request is the target of the request
 * @param ctx - A Koa context object
 */
function isCurrentUser(ctx: KoaContext): boolean {
    const requestUuid = getRequestedUser(ctx);
    if (!requestUuid) return true; // No user was needed

    const uuid = getAuthenticatedUserId(ctx);

    return uuid ? uuid === requestUuid : false; // No logged in user
}

/**
 * Grab the user UUID from the URL
 * @param ctx
 */
function getRequestedUser(ctx: KoaContext): string {
    return ctx.request.params.userId;
}
