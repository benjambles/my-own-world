import { none, Option, some } from 'ts-option';
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
    { encrypted = [], salted = [], hmac = [], readOnly = ['_id'] },
) {
    return async (key: string, value: string): Promise<Option<string>> => {
        if (readOnly.includes(key)) return none;

        if (encrypted.includes(key)) {
            return some(encryptValue(password, value));
        }

        if (salted.includes(key)) {
            return some(await bHash(value));
        }

        if (hmac.includes(key)) {
            return some(getHmac(password, value));
        }

        return some(value);
    };
}

/**
 * Takes a function that when given a key and a value will return
 * a transformed version that that value, or none.
 * @param formatter
 */
export function formatData(
    formatter: (key: string, value: string) => Promise<Option<string>>,
) {
    async function setKeyValues(acc, entries) {
        if (!entries.length) return acc;

        const [[key, value], ...tail] = entries;
        const maybeValue = await formatter(key, value);
        const newAcc = maybeValue
            .map((val) => {
                acc[key] = val;
                return acc;
            })
            .getOrElseValue(acc);

        return await setKeyValues(newAcc, tail);
    }

    return async <T>(data: T): Promise<T> => await setKeyValues({}, Object.entries(data));
}
