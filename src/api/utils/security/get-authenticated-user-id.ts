import { path } from 'ramda';
import { KoaContext } from '../../../shared-server/koa/app';

interface valFromCtx {
    (ctx: KoaContext): string;
}

/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export const getAuthenticatedUserId: valFromCtx = path(['state', 'user', 'uuid']);
