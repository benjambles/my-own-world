import * as Koa from 'koa';
import { isFunction } from 'ramda-adjunct';
import send from './send';

/**
 * Utility function for creating route middleware that allows for setup and response stages.
 * @param defaultError - Error to throw when an uncaught exception is thrown
 * @param response - Async function taking a koa context as an argument that responds to a request
 * @param setup - Async function taking a koa context as an argument that can be used to add pre-response checks
 */
export function generateRoute(
    defaultError: any,
    response: Function,
    setup: Function | null = null
): Koa.Middleware {
    /**
     * A Koa middleware that handles setup and teardown of a route
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async (ctx: Koa.Context, next) => {
        if (isFunction(setup)) await setup(ctx);
        await next();
        await send(ctx, defaultError, response);
    };
}