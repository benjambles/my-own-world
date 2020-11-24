import { hasPath } from 'ramda';
import { KoaContext } from '../../../shared-server/koa/app';

interface IsUser {
    (ctx: KoaContext): boolean;
}

/**
 *
 * @param token
 */
export const isUser: IsUser = hasPath(['state', 'user']);
