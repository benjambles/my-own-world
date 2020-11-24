import { Middleware } from 'koa';
import { isFunction } from 'ramda-adjunct';
import { KoaContext } from '../../../shared-server/koa/app';
import { send } from './send';

/**
 * Utility function for creating route middleware that allows for setup and response stages.
 * @param defaultError - Error to throw when an uncaught exception is thrown
 * @param response - Async function taking a koa context as an argument that responds to a request
 * @param setup - Async function taking a koa context as an argument that can be used to add pre-response checks
 */
export const generateRoute = (
    defaultError: { message: string; status: number },
    response: (ctx: KoaContext) => Promise<any>,
    setup?: (ctx: KoaContext) => Promise<void>,
): Middleware => {
    /**
     * A Koa middleware that handles setup and teardown of a route
     * @param ctx - A Koa context object
     * @param next - Following Koa Middleware
     */
    return async (ctx: KoaContext, next) => {
        if (isFunction(setup)) await setup(ctx);
        await next();
        await send(ctx, defaultError, response);
    };
};
