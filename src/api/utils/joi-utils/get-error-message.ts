import { pick } from 'ramda';
import { maybeProp } from '../functional/maybe-prop';

/**
 *
 * @param error
 */
export const getErrorMessage = (error) => {
    return maybeProp('details', error)
        .map(pick(['message', 'path']))
        .getOrElseValue(error.msg);
};
