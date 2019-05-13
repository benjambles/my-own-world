import { path } from 'ramda';
import { Context } from 'koa';

/**
 *
 * @param token
 */
const isUser = (ctx: Context): boolean => !!path(['state', 'user'], ctx);
export default isUser;
