import { assoc, __ } from 'ramda';
import { getFormattedData } from '../security/get-formatted-data';

interface FormatOptions {
    encrypted?: string[];
    salted?: string[];
    hmac?: string[];
    readOnly?: string[];
}

/**
 * Takes a format configuration that defines how to handle fields within a given model
 * returns a function that performs the formatting on provided data.
 * @param model
 */
export const formatter = (model: FormatOptions) => {
    const formatData = getFormattedData(model);

    const setKeyValues = async (acc, entries) => {
        if (!entries.length) return acc;

        const [[key, value], ...tail] = entries;
        const maybeValue = await formatData(key, value);
        const newAcc = maybeValue.map(assoc(key, __, acc)).getOrElseValue(acc);

        return await setKeyValues(newAcc, tail);
    };

    return async <T>(data: T): Promise<T> => await setKeyValues({}, Object.entries(data));
};
