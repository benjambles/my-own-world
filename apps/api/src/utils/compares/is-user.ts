import type { KoaContext } from '@benjambles/mow-server/dist/koa/app.js';

/**
 *
 * @param token
 */
export function isUser(ctx: KoaContext): boolean {
    return !!ctx.state?.user;
}
