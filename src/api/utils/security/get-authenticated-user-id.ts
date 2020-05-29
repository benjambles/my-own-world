import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { path } from 'ramda';

type valFromCtx = (ctx: ParameterizedContext<DefaultState, DefaultContext>) => string;

/**
 * Return the user that has been granted privaledges on the API
 * @param ctx
 */
export const getAuthenticatedUserId: valFromCtx = path(['state', 'user', 'uuid']);
