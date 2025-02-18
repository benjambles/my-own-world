import { bHash } from '../security/blowfish.js';
import { encryptValue, hmac as getHmac } from '../security/encryption.js';

interface ModelOptions {
    encrypted?: string[];
    salted?: string[];
    hmac?: string[];
    readOnly?: string[];
}

/**
 * Applies security formatters to a property based on the map passed in
 */
export function getDataFormatter(
    password: string,
    { encrypted = [], salted = [], hmac = [], readOnly = ['_id'] }: ModelOptions = {},
) {
    return async (key: string, value: unknown): Promise<string | unknown | null> => {
        if (readOnly.includes(key)) return null;

        if (typeof value !== 'string') return value;

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
    formatter: (key: string, value: unknown) => Promise<string | unknown | null>,
) {
    return async <T extends Record<string, unknown>>(data: T): Promise<T> => {
        const mappedData = await Promise.all(
            Object.entries(data).map(async ([key, value]) => {
                const maybeValue = await formatter(key, value);

                return [key, maybeValue];
            }),
        );

        return Object.fromEntries(mappedData.filter(([, value]) => value !== null));
    };
}
