import type { Middleware } from 'koa';

/**
 * Binds access roles for the current route to the Koa context for authorization checks
 * @param roles
 */
export const setAccessRoles = (roles: string[]): Middleware => {
    return async (ctx, next) => {
        ctx.state.accessRoles = roles;
        await next();
    };
};
