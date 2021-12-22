import type { KoaContext } from '@benjambles/mow-server/dist/koa/app.js';

/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export function getAuthenticatedUserId(ctx: KoaContext): string | undefined {
    return ctx.state?.user?.uuid;
}
