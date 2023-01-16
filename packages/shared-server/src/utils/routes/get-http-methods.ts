export type HTTPVerbs = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';

/**
 *
 * @param acc
 * @param key
 */
export function getHTTPMethods(acc: string[], key: string): string[] {
    if (key === 'options') return acc;
    if (key === 'get') return acc.concat('get', 'head');
    return acc.concat(key);
}
