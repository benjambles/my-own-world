import createError from 'http-errors';
import { KoaRequestParams } from './joi/context/context.js';

type BuildUrlParams<Params extends KoaRequestParams> = {
    path: string;
    prefix?: string;
    rootUrl: string;
    urlParams: Params;
};

export function buildUrl<Params extends KoaRequestParams>({
    rootUrl,
    path,
    urlParams,
    prefix = '',
}: BuildUrlParams<Params>): URL {
    const populatedUrl = new URL(rootUrl);
    const populatedPath = Object.entries(urlParams.params ?? {}).reduce(
        (acc, [key, value]) => acc.replace(`:${key}`, value),
        path,
    );

    populatedUrl.pathname = `${prefix}${populatedPath}`;

    const cleanQueryParams = urlParams.query
        ? Object.fromEntries(
              Object.entries(urlParams.query).map(([k, v]) => {
                  if (typeof v === 'number') return [k, `${v}`];
                  if (Array.isArray(v)) return [k, v.join(',')];
                  return [k, v];
              }),
          )
        : '';

    populatedUrl.search += new URLSearchParams(cleanQueryParams).toString();

    return populatedUrl;
}

export async function parseResponse(
    response: Response,
    errorHandler?: typeof createError,
) {
    const contentType = response.headers.get('Content-Type');
    const responseBody = await (contentType.includes('application/json')
        ? response.json()
        : response.text());

    if (response.status >= 400) {
        throw errorHandler
            ? errorHandler(response.status, responseBody)
            : new Error(responseBody);
    }

    return responseBody;
}
