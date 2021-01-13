import { maybeProp } from '../functional/maybe-prop';

/**
 *
 * @param error
 */
export const getErrorMessage = (error) => {
    return maybeProp('details', error)
        .map(({ message, path }) => ({ message, path }))
        .getOrElseValue(error.msg);
};
