import type { KoaContext } from '@benjambles/mow-server/lib/koa/app.js';

interface ErrorHandler {
    (ctx: KoaContext): (msg?: string) => void;
}

/**
 *
 * @param ctx
 */
export const throwNoAccessError: ErrorHandler = (ctx: KoaContext) => {
    return () => {
        ctx.throw(401, 'Unauthorised access to endpoint');
    };
};

/**
 *
 * @param ctx
 */
export const badResponseError: ErrorHandler = (ctx: KoaContext) => {
    return (msg: string) => {
        ctx.throw(400, msg);
    };
};
