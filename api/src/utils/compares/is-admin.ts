import type { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { pathEq } from 'ramda';

type IsAdmin = (ctx: ParameterizedContext<DefaultState, DefaultContext>) => boolean;

/**
 *
 * @param token
 */
export const isAdmin: IsAdmin = pathEq(['state', 'user', 'userData'], true);
