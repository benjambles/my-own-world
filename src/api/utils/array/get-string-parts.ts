/**
 * Takes a delimiter and a string, performs a split and returns any parts that are truthy
 * Note:: You can not rely on the index of individual parts.
 */
export const getStringParts = (delimiter: string, str: string) => {
    return str.split(delimiter).filter((val: unknown) => !!val);
};
