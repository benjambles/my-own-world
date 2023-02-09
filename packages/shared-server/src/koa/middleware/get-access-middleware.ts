import { Context, Middleware, Next } from 'koa';
import { throwNoAccessError } from '../../utils/errors.js';
import { MethodSchema } from '../../utils/joi/openapi-to-joi.js';

/**
 * Returns a middleware that prevents users from accessing areas of the API based on their roles
 * and the security map for the route
 * @param securityMap
 * @param accessMap
 */
export function getAccessMiddleware(
    accessMap?: (ctx: Context) => (role: string) => boolean,
    securityMap: MethodSchema['security'] = [],
): Middleware {
    const accessRoles = securityMap.find((item) => 'http' in item)?.http ?? [];

    /**
     * Throwns an error if the users system roles and access rights don't match requirements
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async (ctx: Context, next: Next) => {
        if (accessMap && accessRoles.length && !accessRoles.some(accessMap(ctx))) {
            throwNoAccessError(ctx)();
        }

        await next();
    };
}
