import type { KoaContext } from '../../../shared-server/koa/app.js';

/**
 *
 * @param token
 */
export const isUser = (ctx: KoaContext): boolean => !!ctx.state?.user;
