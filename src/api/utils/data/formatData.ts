import { Option } from 'ts-option';

/**
 * Takes a function that when given a key and a value will return
 * a transformed version that that value, or none.
 * @param formatter
 */
export const formatData = (formatter: (key: string, value: string) => Promise<Option<string>>) => {
    const setKeyValues = async (acc, entries) => {
        if (!entries.length) return acc;

        const [[key, value], ...tail] = entries;
        const maybeValue = await formatter(key, value);
        const newAcc = maybeValue
            .map((val) => {
                return { ...acc, [key]: val };
            })
            .getOrElseValue(acc);

        return await setKeyValues(newAcc, tail);
    };

    return async <T>(data: T): Promise<T> => await setKeyValues({}, Object.entries(data));
};
