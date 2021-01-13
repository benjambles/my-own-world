import { none, Option, some } from 'ts-option';
import { bHash } from './blowfish';
import { encryptValue, hmac as getHmac } from './encryption';

interface FormatOptions {
    encrypted?: string[];
    salted?: string[];
    hmac?: string[];
    readOnly?: string[];
}

/**
 * Applies security formatters to a property based on the map passed in
 */
export const getDataFormatter = (
    password: string,
    { encrypted = [], salted = [], hmac = [], readOnly = ['uuid'] }: FormatOptions,
) => {
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
};
