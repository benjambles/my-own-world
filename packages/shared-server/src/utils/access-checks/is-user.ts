import { Context } from 'koa';

/**
 *
 * @param token
 */
export function isUser(ctx: Context): boolean {
    return Object.keys(ctx.state?.user ?? {}).length > 0;
}
