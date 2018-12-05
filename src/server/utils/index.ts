import * as uuidv5 from 'uuid/v5';

import { uuidv5_NS } from './config';
import * as Security from './security';

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
export function getUUID(value: string): string {
    return uuidv5(value, uuidv5_NS);
}

/**
 *
 * @param data
 */
export function cloneData(data) {
    if (Array.isArray(data)) {
        return [...data];
    }

    if (typeof data === 'object') {
        return { ...data };
    }

    return data; // Simple types aren't passed by reference, we're good to go.
}

export function cleanData(formatter) {
    return async data => await formatter(cloneData(data));
}

/**
 *
 * @param data
 */
export function format(model = { encrypted: [], hashed: {}, readOnly: ['uuid'] }) {
    const { encrypted, hashed, readOnly } = model;
    const { salted, hmac } = Object.entries(hashed).reduce(
        (acc, [type, fields]) => {
            acc[type].concat(fields);
            return acc;
        },
        { salted: [], hmac: [] }
    );

    return async function(data: dbData) {
        const formattedData = {};

        await Promise.all(
            Object.entries(data).map(
                async ([key, value]): Promise<void> => {
                    if (readOnly.includes(key)) return;

                    if (encrypted.includes(key)) {
                        value = Security.encryptValue(value);
                    } else if (salted.includes(key)) {
                        value = await Security.bHash(value);
                    } else if (hmac.includes(key)) {
                        value = await Security.hmac(value);
                    }

                    formattedData[key] = value;
                }
            )
        );

        return formattedData;
    };
}
