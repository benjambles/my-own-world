import { hasPath } from 'ramda';
import { KoaContext } from '@sharedServer/koa/app';

interface IsUser {
    (ctx: KoaContext): boolean;
}

/**
 *
 * @param token
 */
export const isUser: IsUser = hasPath(['state', 'user']);
