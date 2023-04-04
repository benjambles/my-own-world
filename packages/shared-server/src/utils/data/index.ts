import { bHash } from '../security/blowfish.js';
import { encryptValue, hmac as getHmac } from '../security/encryption.js';

export interface ModelOptions {
    encrypted: string[];
    salted: string[];
    hmac: string[];
    readOnly: string[];
}

/**
 * Applies security formatters to a property based on the map passed in
 */
export function getDataFormatter(
    password: string,
    { encrypted, salted, hmac, readOnly = ['_id'] },
) {
    return async (key: string, value: string): Promise<string | null> => {
        if (readOnly.includes(key)) return null;

        if (encrypted.includes(key)) {
            return encryptValue(password, value);
        }

        if (salted.includes(key)) {
            return await bHash(value);
        }

        if (hmac.includes(key)) {
            return getHmac(password, value);
        }

        return value;
    };
}

/**
 * Takes a function that when given a key and a value will return
 * a transformed version that that value, or none.
 * @param formatter
 */
export function formatData(
    formatter: (key: string, value: string) => Promise<string | null>,
) {
    return async <T>(data: T): Promise<T> => {
        return await setKeyValues(formatter, {}, Object.entries(data));
    };
}

async function setKeyValues(
    formatter: (key: string, value: string) => Promise<string | null>,
    acc: Record<string, string>,
    entries: [string, any][],
) {
    if (!entries.length) return acc;

    const [[key, value], ...tail] = entries;
    const maybeValue = await formatter(key, value);

    if (maybeValue !== null) {
        acc[key] = maybeValue;
    }

    return await setKeyValues(formatter, acc, tail);
}
