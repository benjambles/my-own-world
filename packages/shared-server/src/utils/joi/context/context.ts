import { Identity } from '@benjambles/js-lib/dist/index.js';
import { Context, Request } from 'koa';
import { Ref } from '../openapi-to-joi.js';
import { Param, ParseParam } from './request-parameters.js';

export type ContextFromParams<
    Params extends readonly any[] = readonly [],
    Result extends object = {},
    Body = any,
    Components extends {} = {},
> = Params extends readonly [infer First extends Param | Ref, ...infer Rest]
    ? ContextFromParams<Rest, Result & ParseParam<First, Components>, Body, Components>
    : KoaContext<Identity<Result>, Identity<Body>>;

export type HandlerArgs<
    Params extends readonly any[] = readonly [],
    Result extends object = {},
    Components extends {} = {},
> = Params extends readonly [infer First extends Param | Ref, ...infer Rest]
    ? HandlerArgs<Rest, Result & ParseParam<First, Components>, Components>
    : Identity<Result>;

interface KoaRequest<RequestParams extends KoaRequestParams> extends Request {
    body: RequestParams['body'] extends never ? Request['body'] : RequestParams['body'];
    params: RequestParams['params'] extends never
        ? Request['params']
        : RequestParams['params'];
    query: RequestParams['query'] extends never
        ? Request['query']
        : RequestParams['query'];
}

export interface KoaContext<RequestParams extends KoaRequestParams, ResponseBody = any>
    extends Context {
    body: ResponseBody;
    request: KoaRequest<RequestParams>;
}

export interface KoaRequestParams {
    body?: {
        [key: string]: unknown;
    };
    params?: {
        [key: string]: string;
    };
    query?: {
        [key: string]: string | string[];
    };
}
