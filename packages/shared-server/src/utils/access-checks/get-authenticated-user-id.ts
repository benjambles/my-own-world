import { KoaContext } from '../../index.js';

/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export function getAuthenticatedUserId(ctx: KoaContext): string | undefined {
    return ctx.state?.user?.uuid;
}
