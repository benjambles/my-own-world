import { pick } from 'ramda';
import { maybeProp } from '../functional/maybe-prop';

/**
 *
 * @param error
 */
export default function getErrorMessage(error) {
    return maybeProp('details', error)
        .map(pick(['message', 'path']))
        .getOrElse(error.msg);
}
