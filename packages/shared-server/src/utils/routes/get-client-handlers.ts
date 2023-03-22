import { Id, UnionToTuple } from '@benjambles/js-lib/dist/index.js';
import { Select } from 'ts-toolbelt/out/List/Select.js';
import { URL, URLSearchParams } from 'url';
import { ResourceConfig } from '../../routing/create-resource.js';
import { stringifyJson } from '../data/json.js';
import { maybeProp } from '../functional/maybe-prop.js';
import { HandlerArgs, KoaRequestParams } from '../joi/context/context.js';
import { MaybeBodyContext } from '../joi/context/request-body.js';
import { ApiDoc, MethodSchema, UnionFromProps } from '../joi/openapi-to-joi.js';
import {
    MaybeHandlerResponse,
    ValidResponses,
} from '../joi/responses/openapi-to-types.js';
import { HTTPVerbs } from './get-http-methods.js';

//#region Types
interface ResourceBinder<
    Config extends ResourceConfig,
    D extends {
        [name: string]: (args: any) => Promise<unknown>;
    } = {},
> {
    get: () => Id<D>;
    operation: <K extends keyof Config['operations']>(
        operationId: K,
        hostUrl: string,
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
          ) => Promise<MaybeHandlerResponse<Schema['responses'], Components>>;
      }
    : never;

interface FetchHandlerArgs {
    method: HTTPVerbs;
    responses: ValidResponses;
    url: string;
}
//#endregion Types

export function getClientHandlers<T extends ResourceConfig>(
    resources: T,
    hostUrl: string,
) {
    const fetchParams = extractParams(resources.apiDoc);

    return Object.keys(resources['operations'])
        .reduce((acc, operationId) => {
            return acc.operation(operationId, hostUrl, fetchParams[operationId]);
        }, getClientBinder<T>())
        .get() as ClientHandlers<T>;
}

function getClientBinder<T extends ResourceConfig>(): ResourceBinder<T> {
    const clientBinder = (data) => {
        return {
            get() {
                return data;
            },
            operation(operationId: keyof T['operations'], hostUrl: string, fetchArgs) {
                return clientBinder({
                    ...data,
                    [operationId]: getFetchHandler(hostUrl, fetchArgs),
                });
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
                        responses: methodConfig.responses,
                    };

                    return acc;
                },
                {},
            );
        }),
    );
}

function getFetchHandler<Params extends KoaRequestParams, Result extends any>(
    hostUrl: string,
    { method, responses, url }: FetchHandlerArgs,
) {
    return async (args: Params): Promise<Result> => {
        const data: RequestInit = {
            method,
            body: stringifyJson(args.body).getOrElseValue(undefined),
        };

        const populatedUrl = new URL(
            maybeProp('params', args)
                .map(Object.entries)
                .map((params) => {
                    return params.reduce(
                        (acc, [key, value]) => acc.replace(`:${key}`, value),
                        url,
                    );
                })
                .getOrElseValue(url),
            hostUrl,
        );

        populatedUrl.search += new URLSearchParams(
            maybeProp('query', args).getOrElseValue(''),
        ).toString();

        const resp = await fetch(populatedUrl, data);
        const [response] = Object.values(responses) as [ValidResponses];

        if (!('content' in response)) {
            return undefined;
        }

        return Object.keys(response.content)[0] === 'text/plain'
            ? resp.text()
            : resp.json();
    };
}
