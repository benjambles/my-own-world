import type { KoaContext } from '@benjambles/mow-server/lib/koa/app.js';

/**
 *
 * @param token
 */
export const isUser = (ctx: KoaContext): boolean => !!ctx.state?.user;
