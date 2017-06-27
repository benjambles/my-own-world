export function flatten(arr): Array<any> {
    return arr.reduce((acc, val) => acc.concat(
        Array.isArray(val) ? flatten(val) : val
    ), []);
}