export type HTTPVerbs = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';

type HttpVerbsFull = HTTPVerbs | 'head';

/**
 *
 * @param acc
 * @param key
 */
export function getHTTPMethods(acc: HttpVerbsFull[], key: HTTPVerbs): HttpVerbsFull[] {
    if (key === 'options') return acc;
    if (key === 'get') return acc.concat('get', 'head');
    return acc.concat(key);
}
