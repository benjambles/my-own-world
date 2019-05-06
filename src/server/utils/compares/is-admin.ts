import { pathEq } from 'ramda';

/**
 *
 * @param token
 */
const isAdmin = (ctx): boolean => pathEq(['state', 'user', 'userData'], true, ctx);
export default isAdmin;
