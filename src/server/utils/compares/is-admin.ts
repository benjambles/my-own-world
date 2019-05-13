import { pathEq } from 'ramda';
import { Context } from 'koa';

/**
 *
 * @param token
 */
const isAdmin = (ctx: Context): boolean => pathEq(['state', 'user', 'userData'], true, ctx);
export default isAdmin;
