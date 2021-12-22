import type { KoaContext } from '@benjambles/mow-server/dist/koa/app.js';

/**
 *
 * @param ctx
 */
export function throwNoAccessError(ctx: KoaContext) {
    return () => {
        ctx.throw(401, 'Unauthorised access to endpoint');
    };
}

/**
 *
 * @param ctx
 */
export function badResponseError(ctx: KoaContext) {
    return (msg: string) => {
        ctx.throw(400, msg);
    };
}
