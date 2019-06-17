import * as Koa from 'koa';
import { path } from 'ramda';
/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export default function getAuthenticatedUserId(ctx: Koa.Context): string {
    return path(['state', 'user', 'uuid'], ctx);
}
