import { none, some } from 'fp-ts/lib/Option';
import { cond, T, includes, __ } from 'ramda';
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
    return async (key: string, value) =>
        await cond([
            [includes(__, readOnly), async () => none],
            [includes(__, encrypted), async () => some(encryptValue(value))],
            [includes(__, salted), async () => some(await bHash(value))],
            [includes(__, hmac), async () => some(await getHmac(value))],
            [T, async () => some(value)],
        ])(key);
};
