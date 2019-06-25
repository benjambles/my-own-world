import { path } from 'ramda';
import { Context } from 'koa';

/**
 *
 * @param token
 */
export default function isUser(ctx: Context): boolean {
    return !!path(['state', 'user'], ctx);
}
