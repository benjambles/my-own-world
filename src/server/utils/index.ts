import * as uuidv5 from 'uuid/v5';
import { uuidv5_NS } from './config';
import * as Security from './security';
import { clone, assoc, compose } from 'ramda';

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
export function getUUID(value: string): string {
    return uuidv5(value, uuidv5_NS);
}

/**
 *
 */
export const formatter = compose(
    cleanData,
    format
);

/**
 *
 * @param formatter
 */
export function cleanData(formatter: (v: any) => {}) {
    return async data => await formatter(clone(data));
}

/**
 * Takes a format configuration that defines how to handle fields within a given model
 * returns a function that performs the formatting on provided data.
 * @param model
 */
export function format(model: formatOptions) {
    const { encrypted = [], hashed = {}, readOnly = ['uuid'] } = model;
    const { salted, hmac } = Object.entries(hashed).reduce(
        (acc, [type, fields]) => assoc(type, acc[type].concat(fields), acc),
        { salted: [], hmac: [] }
    );

    /**
     * @param {object} data - The data to impose the format upon
     */
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
