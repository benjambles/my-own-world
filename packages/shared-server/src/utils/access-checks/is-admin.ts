import { KoaContext } from '../../index.js';

/**
 *
 * @param token
 */
export function isAdmin(ctx: KoaContext): boolean {
    return ctx.state?.user?.userData === true;
}
