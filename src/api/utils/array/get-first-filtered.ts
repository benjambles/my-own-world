import { compose, filter, head } from 'ramda';

interface predicateFn {
    (value: any): boolean;
}

/**
 *
 * @param predicate
 */
export const getFirstFiltered = (predicate: predicateFn) => compose(head, filter(predicate));
