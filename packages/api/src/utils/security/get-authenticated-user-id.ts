import type { KoaContext } from '@benjambles/mow-server/lib/koa/app.js';

/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export const getAuthenticatedUserId = (ctx: KoaContext): string | undefined =>
    ctx.state?.user?.uuid;
