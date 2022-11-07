import { KoaContext } from '../../index.js';

/**
 *
 * @param token
 */
export function isUser(ctx: KoaContext): boolean {
    return Object.keys(ctx.state?.user ?? {}).length > 0;
}
