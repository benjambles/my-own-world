import createError from 'http-errors';
import { KoaRequestParams } from './joi/context/context.js';

type BuildUrlParams<Params extends KoaRequestParams> = {
    path: string;
    prefix?: string;
    rootUrl: string;
    urlParams: Params;
};

export function buildUrl<Params extends KoaRequestParams>({
    path,
    rootUrl,
    urlParams,
    prefix = '',
}: BuildUrlParams<Params>): URL {
    const populatedUrl = new URL(rootUrl);
    const populatedPath = urlParams.params
        ? path.replace(
              /(?<=\/)(:[a-zA-Z]*)/g,
              (param) => urlParams.params[param.replace(':', '')] ?? '',
          )
        : path;

    populatedUrl.pathname = `${prefix}${populatedPath}`;

    const cleanQueryParams = urlParams.query ? toQueryStringParams(urlParams.query) : '';

    populatedUrl.search += new URLSearchParams(cleanQueryParams).toString();

    return populatedUrl;
}

function toQueryStringParams(query: KoaRequestParams['query']): Record<string, string> {
    return Object.fromEntries(
        Object.entries(query).map(([k, v]) => {
            if (typeof v === 'number') return [k, `${v}`];
            if (Array.isArray(v)) return [k, v.join(',')];
            return [k, v];
        }),
    );
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
