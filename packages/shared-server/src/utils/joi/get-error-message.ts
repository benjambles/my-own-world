import { maybeProp } from '../functional/maybe-prop.js';

/**
 *
 * @param error
 */
export function getErrorMessage(error) {
    return maybeProp('details', error)
        .map((details) => details.map(({ message, path }) => ({ message, path })))
        .getOrElseValue(error.msg);
}
