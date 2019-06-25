import { map } from 'ramda';
import { maybeProp } from '../functional/maybe-prop';

/**
 *
 * @param error
 */
export default function getErrorMessage(error) {
    return maybeProp('details', error)
        .map(map(({ message, path }) => ({ error: message, field: path })))
        .getOrElse(error.msg);
}
