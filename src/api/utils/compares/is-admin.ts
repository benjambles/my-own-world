import type { KoaContext } from '../../../shared-server/koa/app.js';

/**
 *
 * @param token
 */
export const isAdmin = (ctx: KoaContext): boolean => {
    return ctx.state?.user?.userData === true;
};
