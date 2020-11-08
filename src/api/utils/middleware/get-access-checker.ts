import { Middleware } from 'koa';
import { none } from 'ramda';
import { throwNoAccessError } from '../errors/errors';

/**
 * Returns a middleware that prevents users from accessing areas of the API based on their roles
 * and the security map for the route
 * @param accessMap
 */
export const getAccessChecker = (accessMap?: any): Middleware => {
    /**
     * Throwns an error if the users system roles and access rights don't match requirements
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async (ctx, next) => {
        const { accessRoles } = ctx?.state ?? {};

        if (accessMap && accessRoles && none(accessMap(ctx), accessRoles)) {
            throwNoAccessError(ctx)();
        }

        await next();
    };
};
