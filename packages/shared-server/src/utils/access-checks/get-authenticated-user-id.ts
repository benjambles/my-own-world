import { Context } from 'koa';

/**
 * Checks to see if the user making the request is the target of the request
 * @param ctx - A Koa context object
 */
export function isCurrentUser(ctx: Context): boolean {
    const requestUuid = getRequestedUser(ctx);
    if (!requestUuid) return true; // No user was needed

    const uuid = getAuthenticatedUserId(ctx);

    return uuid ? uuid === requestUuid : false; // No logged in user
}

/**
 * Grab the user UUID from the URL
 * @param ctx
 */
export function getRequestedUser(ctx: Context): string | undefined {
    return ctx.request.params.userId;
}

/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export function getAuthenticatedUserId(ctx: Context): string | undefined {
    return ctx.state?.user?.sub;
}
