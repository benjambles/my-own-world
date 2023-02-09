import { Context } from 'koa';
import { getAuthenticatedUserId } from './get-authenticated-user-id.js';

/**
 *
 * @param token
 */
export function isUser(ctx: Context): boolean {
    return getAuthenticatedUserId(ctx) !== undefined;
}
