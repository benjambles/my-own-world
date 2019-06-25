import * as Koa from 'koa';

/**
 * Binds access roles for the current route to the Koa context for authorization checks
 * @param roles
 */
export default function setAccessRoles(roles: string[]): Koa.Middleware {
    return async (ctx, next) => {
        ctx.state.accessRoles = roles;
        await next();
    };
}
