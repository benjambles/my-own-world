import { pathEq } from 'ramda';
import { Context } from 'koa';

/**
 *
 * @param token
 */
export default function isAdmin(ctx: Context): boolean {
    return pathEq(['state', 'user', 'userData'], true, ctx);
}
