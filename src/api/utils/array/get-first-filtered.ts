import { compose, filter, head } from 'ramda';

type predicateFn = (value: any) => boolean;
/**
 *
 * @param predicate
 */
export default function getFirstFiltered(predicate: predicateFn) {
    return compose(
        head,
        filter(predicate)
    );
}
