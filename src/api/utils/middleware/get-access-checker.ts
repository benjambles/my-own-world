import * as Koa from 'koa';
import { compose, none, pathOr, when } from 'ramda';
import { isTrue, lengthGt } from 'ramda-adjunct';
import { throwNoAccessError } from '../errors/errors';

/**
 * Returns a middleware that prevents users from accessing areas of the API based on their roles
 * and the security map for the route
 * @param accessMap
 */
export function getAccessChecker(accessMap?: any): Koa.Middleware {
    /**
     * Throwns an error if the users system roles and access rights don't match requirements
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async (ctx, next) => {
        if (accessMap) {
            compose(
                when(isTrue, () => throwNoAccessError(ctx)),
                when(lengthGt(0), none(accessMap(ctx))),
                pathOr([], ['state', 'accessRoles'])
            )(ctx);
        }

        await next();
    };
}
