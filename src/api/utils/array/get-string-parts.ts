import { compact } from 'ramda-adjunct';
import { compose, split } from 'ramda';

/**
 * Takes a delimiter and a string, performs a split and returns any parts that are truthy
 * Note:: You can not rely on the index of individual parts.
 */
export default function getStringParts(delimiter: string) {
    return compose(
        compact,
        split(delimiter)
    );
}
