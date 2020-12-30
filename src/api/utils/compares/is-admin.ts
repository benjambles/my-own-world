import { pathEq } from 'ramda';
import { KoaContext } from '@sharedServer/koa/app';

interface IsAdmin {
    (ctx: KoaContext): boolean;
}

/**
 *
 * @param token
 */
export const isAdmin: IsAdmin = pathEq(['state', 'user', 'userData'], true);
