import { compact } from 'ramda-adjunct';

/**
 * Takes a delimiter and a string, performs a split and returns any parts that are truthy
 * Note:: You can not rely on the index of individual parts.
 * @param delimiter
 * @param str
 */
export default function getStringParts(delimiter: string, str: string): string[] {
    return compact(str.split(delimiter));
}
