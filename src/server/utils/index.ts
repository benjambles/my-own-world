import * as uuidv5 from "uuid/v5";

import { uuidv5_NS } from "./config";
import * as Security from "./security";

/**
 * Deep flatten an array
 * @param arr array of arrays to any depth
 */
export function deepFlatten(arr: any[]): any[] {
    return arr.reduce(
        (acc: any[], val: any) => acc.concat(Array.isArray(val) ? deepFlatten(val) : val),
        []
    );
}

/**
 * Flatten a 2 dimensional array
 * @param acc accumulator array
 * @param val value to add to the array
 */
export function flatten(acc: any[], val: any): any[] {
    return acc.concat(val);
}

/**
 * Return a namespaced UUID using UUIDv5
 * @param value A value to convert into a namespaced uuidv5 string
 */
export function getUUID(value: string): string {
    return uuidv5(value, uuidv5_NS);
}

/**
 * Check to see if the provided value is a valid uuid string
 * @param uuid a string to test for validity
 * String -> Bool
 */
export function isValidUuid(uuid: string): boolean {
    const re = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    return re.test(uuid);
}

/**
 * Checks is given parameter is truthy
 * @param value
 */
export function isTrue(value: any): boolean {
    return !!value === true;
}

export function isAdmin(token): boolean {
    const userData = token.user;
    return userData.admin && userData.admin === true;
}

export function isDefined(value: any): boolean {
    return typeof value !== undefined;
}

export function cloneData(data) {
    if (Array.isArray(data)) {
        return data.slice();
    }

    if (typeof data === "object") {
        return Object.assign({}, data);
    }

    return data; // Simple types aren't passed by reference, we're good to go.
}

export function cleanData(formatter) {
    return data => formatter(cloneData(data));
}

/**
 *
 * @param data
 */
export function format(model = { encrypted: [], hashed: [], readOnly: ["uuid"] }) {
    const { encrypted, hashed, readOnly } = model;
    const formattedData = {};

    return async function(data: dbData) {
        await Object.entries(data).forEach(async ([key, value]): Promise<void> => {
            if (readOnly.includes(key)) return;

            if (encrypted.includes(key)) {
                value = Security.encryptValue(value);
            } else if (hashed.includes(key)) {
                value = await Security.hash(value);
            }

            formattedData[key] = value;
        });

        return data;
    };
}

export function isNil(value) {
    return value == null;
}
