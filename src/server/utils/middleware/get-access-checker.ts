import * as Koa from 'koa';
import { when, all, pathOr } from 'ramda';
import { isTruthy } from 'ramda-adjunct';

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
        when(isTruthy, () => {
            const roles = pathOr([], ['state', 'accessRoles'], ctx) as string[];
            const hasAccess = roles.some(accessMap(ctx));

            when(all(isTruthy), noAccessError(ctx))([roles.length, !hasAccess]);
        })(accessMap);

        await next();
    };
}

const noAccessError = ctx => () => {
    ctx.throw(401, 'Unauthorised access to endpoint');
};
