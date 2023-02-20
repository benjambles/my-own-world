import { Context } from 'koa';

/**
 *
 * @param token
 */
export function isAdmin(ctx: Context): boolean {
    return ctx.state.user?.isAdmin === true; // TODO: define admin users
}
