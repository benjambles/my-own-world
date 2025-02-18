import { Identity } from '@benjambles/js-lib/dist/index.js';
import { Context, Request } from 'koa';
import { Ref } from '../openapi-to-joi.js';
import { Param, ParseParam } from './request-parameters.js';

export type ContextFromParams<
    Params extends readonly any[] = readonly [],
    Result extends object = {},
    Body = unknown,
    State extends { method: string; path: string } = {
        method: 'get';
        path: '';
    },
    Components extends {} = {},
> = Params extends readonly [infer First extends Param | Ref, ...infer Rest]
    ? ContextFromParams<
          Rest,
          Result & ParseParam<First, Components>,
          Body,
          State,
          Components
      >
    : KoaContext<Identity<Result>, State, Identity<Body>>;

export type HandlerArgs<
    Params extends readonly any[] = readonly [],
    Result extends object = {},
    Components extends {} = {},
> = Params extends readonly [infer First extends Param | Ref, ...infer Rest]
    ? HandlerArgs<Rest, Result & ParseParam<First, Components>, Components>
    : Identity<Result>;

export interface KoaRequest<RequestParams extends KoaRequestParams> extends Request {
    body: RequestParams['body'] extends never ? Request['body'] : RequestParams['body'];
    params: RequestParams['params'] extends never
        ? Request['params']
        : RequestParams['params'];
    query: RequestParams['query'] extends never
        ? Request['query']
        : RequestParams['query'];
}

export interface KoaContext<
    RequestParams extends KoaRequestParams,
    State,
    ResponseBody = any,
> extends Context {
    body: ResponseBody;
    request: KoaRequest<RequestParams>;
    state: State & Context['state'] & { user?: { sub: string; isAdmin: boolean } };
}

export interface KoaRequestParams {
    body?: {
        [key: string]: unknown;
    };
    params?: {
        [key: string]: string;
    };
    query?: {
        [key: string]: number | string | string[];
    };
}
