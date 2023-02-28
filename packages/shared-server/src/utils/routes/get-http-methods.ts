export type HTTPVerbs = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options';

type HttpVerbsFull = HTTPVerbs | 'head';

/**
 *
 * @param acc
 * @param key
 */
export function getHTTPMethods(acc: HttpVerbsFull[], key: HTTPVerbs): HttpVerbsFull[] {
    if (key === 'get') return acc.concat('get', 'head');
    if (key === 'options') return acc;
    return acc.concat(key);
}
