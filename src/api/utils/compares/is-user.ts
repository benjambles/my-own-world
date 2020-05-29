import type { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { hasPath } from 'ramda';

type IsUser = (ctx: ParameterizedContext<DefaultState, DefaultContext>) => boolean;

/**
 *
 * @param token
 */
export const isUser: IsUser = hasPath(['state', 'user']);
