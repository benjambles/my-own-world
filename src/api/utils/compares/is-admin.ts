import { pathEq } from 'ramda';
import { KoaContext } from '../../../shared-server/koa/app';

interface IsAdmin {
    (ctx: KoaContext): boolean;
}

/**
 *
 * @param token
 */
export const isAdmin: IsAdmin = pathEq(['state', 'user', 'userData'], true);
