import { path } from 'ramda';

/**
 *
 * @param token
 */
const isUser = (ctx): boolean => !!path(['state', 'user'], ctx);
export default isUser;
