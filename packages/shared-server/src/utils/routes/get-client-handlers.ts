import { Identity, UnionToTuple } from '@benjambles/js-lib/dist/index.js';
import createError from 'http-errors';
import { Select } from 'ts-toolbelt/out/List/Select.js';
import { ResourceConfig } from '../../routing/create-resource.js';
import { buildUrl, parseResponse } from '../fetch.js';
import { HandlerArgs, KoaRequestParams } from '../joi/context/context.js';
import { MaybeBodyContext } from '../joi/context/request-body.js';
import { ApiDoc, MethodSchema, UnionFromProps } from '../joi/openapi-to-joi.js';
import { MaybeHandlerResponse } from '../joi/responses/openapi-to-types.js';
import { HTTPVerbs } from './get-http-methods.js';

//#region Types
interface ResourceBinder<
    Config extends ResourceConfig,
    D extends {
        [name: string]: (args: unknown) => Promise<unknown>;
    } = {},
> {
    get: () => Identity<D>;
    operation: <K extends keyof Config['operations']>(
        operationId: K,
        hostUrl: string,
        prefix: string,
        fetchArgs: FetchHandlerArgs,
    ) => ResourceBinder<Config, D & { [key in K]: OperationConfig<Config['apiDoc'], K> }>;
}

type ClientHandlers<Data extends ResourceConfig> = {
    [Operation in keyof Data['operations']]: OperationConfig<Data['apiDoc'], Operation>;
};

type OperationConfig<T extends ApiDoc, Key> = Select<
    UnionToTuple<UnionFromProps<OperationIdsPerPath<T>>>,
    { operationId: Key }
>[0]['handler'];

type OperationIdsPerPath<T extends ApiDoc> = T extends ApiDoc
    ? {
          [K in keyof T['paths']]: [
              MaybeOperation<T['paths'][K][keyof T['paths'][K]], T['components']>,
          ];
      }
    : never;

type MaybeOperation<
    Schema,
    Components extends ApiDoc['components'],
> = Schema extends MethodSchema
    ? {
          operationId: Schema['operationId'];
          handler: (
              params: HandlerArgs<
                  Schema['parameters'],
                  MaybeBodyContext<Schema['requestBody'], Components>,
                  Components
              >,
              accessToken?: string,
          ) => Promise<MaybeHandlerResponse<Schema['responses'], Components>>;
      }
    : never;

interface FetchHandlerArgs {
    method: HTTPVerbs;
    path: string;
}
//#endregion Types

export function getClientHandlers<T extends ResourceConfig>(
    resources: T,
    hostUrl: string,
    prefix: string,
) {
    const fetchParams = extractParams(resources.apiDoc);

    return Object.keys(resources['operations'])
        .reduce((acc, operationId) => {
            return acc.operation(operationId, hostUrl, prefix, fetchParams[operationId]);
        }, getClientBinder<T>())
        .get() as ClientHandlers<T>;
}

function getClientBinder<T extends ResourceConfig>(): ResourceBinder<T> {
    const clientBinder = (data) => {
        return {
            get() {
                return data;
            },
            operation(
                operationId: keyof T['operations'],
                hostUrl: string,
                prefix: string,
                fetchArgs,
            ) {
                data[operationId] = getFetchHandler(hostUrl, prefix, fetchArgs);
                return clientBinder(data);
            },
        };
    };

    return clientBinder({});
}

function extractParams<Doc extends ApiDoc>(doc: Doc): Record<string, FetchHandlerArgs> {
    return Object.assign(
        {},
        ...Object.entries(doc['paths']).map(([path, config]) => {
            return Object.entries(config).reduce(
                (acc, [method, methodConfig]: [HTTPVerbs, MethodSchema]) => {
                    acc[methodConfig.operationId] = {
                        method,
                        path,
                    };

                    return acc;
                },
                {},
            );
        }),
    );
}

function getFetchHandler<Params extends KoaRequestParams, Result>(
    rootUrl: string,
    prefix: string,
    { method, path }: FetchHandlerArgs,
) {
    return async (args: Params, accessToken?: string): Promise<Result> => {
        const populatedUrl = buildUrl({ path, prefix, rootUrl, urlParams: args });
        const body = args.body ? { body: JSON.stringify(args.body) } : {};

        const response = await fetch(populatedUrl, {
            ...body,
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
            method,
        });

        return parseResponse(response, createError);
    };
}
