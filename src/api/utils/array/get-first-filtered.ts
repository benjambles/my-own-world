import { compose, filter, head, Morphism } from 'ramda';

/**
 *
 * @param predicate
 */
export default function getFirstFiltered(predicate: Morphism<any, boolean>) {
    return compose(
        head,
        filter(predicate)
    );
}
