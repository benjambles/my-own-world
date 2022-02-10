import { KoaContext } from '../../index.js';

/**
 *
 * @param token
 */
export function isUser(ctx: KoaContext): boolean {
    return ctx.state?.user === true;
}
