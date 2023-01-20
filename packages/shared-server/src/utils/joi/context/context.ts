import { Id } from '@benjambles/js-lib/dist/index.js';
import { Context, Request } from 'koa';
import { Param, ParamToContext } from './request-parameters.js';

export type ContextFromParams<
    Params extends readonly any[] = readonly [],
    Result extends object = {},
    Body = any,
> = Params extends readonly [infer First extends Param, ...infer Rest]
    ? ContextFromParams<Rest, Result & ParamToContext<First>, Body>
    : KoaContext<Id<Result>, Body>;

interface KoaRequest<RequestParams extends KoaRequestParams> extends Request {
    query: RequestParams['query'] extends never
        ? Request['query']
        : RequestParams['query'];
    params: RequestParams['params'] extends never
        ? Request['params']
        : RequestParams['params'];
    body: RequestParams['body'] extends never ? Request['body'] : RequestParams['body'];
}

interface KoaContext<RequestParams extends KoaRequestParams, ResponseBody = any>
    extends Context {
    request: KoaRequest<RequestParams>;
    body: ResponseBody;
}

type KoaRequestParams = {
    params?: {
        [key: string]: string;
    };
    query?: {
        [key: string]: string | string[];
    };
    body?: {
        [key: string]: unknown;
    };
};
