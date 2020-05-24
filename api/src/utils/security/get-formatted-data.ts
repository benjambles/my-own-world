import { none, some } from 'fp-ts/lib/Option';
import { cond, T } from 'ramda';
import { bHash } from './blowfish';
import { encryptValue, hmac as getHmac } from './encrpytion';

/**
 * Applies security formatters to a property based on the map passed in
 */
export const getFormattedData = ({
    encrypted = [],
    salted = [],
    hmac = [],
    readOnly = ['uuid'],
}: formatOptions) => {
    const includes = (arr) => (key) => arr.includes(key);

    return async (key: string, value) =>
        await cond([
            [includes(readOnly), async () => none],
            [includes(encrypted), async () => some(encryptValue(value))],
            [includes(salted), async () => some(await bHash(value))],
            [includes(hmac), async () => some(await getHmac(value))],
            [T, async () => some(value)],
        ])(key);
};
