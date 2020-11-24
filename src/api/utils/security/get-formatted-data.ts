import { cond, includes, T, __ } from 'ramda';
import { none, Option, some } from 'ts-option';
import { bHash } from './blowfish';
import { encryptValue, hmac as getHmac } from './encrpytion';

interface FormatOptions {
    encrypted?: string[];
    salted?: string[];
    hmac?: string[];
    readOnly?: string[];
}

/**
 * Applies security formatters to a property based on the map passed in
 */
export const getFormattedData = ({
    encrypted = [],
    salted = [],
    hmac = [],
    readOnly = ['uuid'],
}: FormatOptions) => {
    return async (key: string, value: string): Promise<Option<string>> =>
        await cond([
            [includes(__, readOnly), async () => none],
            [includes(__, encrypted), async () => some(encryptValue(value))],
            [includes(__, salted), async () => some(await bHash(value))],
            [includes(__, hmac), async () => some(getHmac(value))],
            [T, async () => some(value)],
        ])(key);
};
