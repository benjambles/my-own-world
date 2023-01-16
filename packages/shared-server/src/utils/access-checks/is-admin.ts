import { Context } from 'koa';

/**
 *
 * @param token
 */
export function isAdmin(ctx: Context): boolean {
    return ctx.state?.user?.userData === true;
}
