import { Middleware } from 'koa';

/**
 * Binds access roles for the current route to the Koa context for authorization checks
 * @param roles
 */
export function setAccessRoles(roles): Middleware {
    return async (ctx, next) => {
        ctx.state.accessRoles = roles.http;
        await next();
    };
}
