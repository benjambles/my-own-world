import type { KoaContext } from '@benjambles/mow-server/lib/koa/app.js';

/**
 *
 * @param token
 */
export const isAdmin = (ctx: KoaContext): boolean => {
    return ctx.state?.user?.userData === true;
};
