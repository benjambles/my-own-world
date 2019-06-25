import { encryptValue, hmac as getHmac } from './encrpytion';
import { bHash } from './blowfish';
import { cond } from 'ramda';
import { some, none } from 'fp-ts/lib/Option';

/**
 * Applies security formatters to a property based on the map passed in
 */
export default function getFormattedData({
    encrypted = [],
    salted = [],
    hmac = [],
    readOnly = ['uuid']
}: formatOptions) {
    return async (key: string, value) =>
        await cond([
            [readOnly.includes, async () => none],
            [encrypted.includes, async () => some(encryptValue(value))],
            [salted.includes, async () => some(await bHash(value))],
            [hmac.includes, async () => some(await getHmac(value))]
        ])(key);
}
