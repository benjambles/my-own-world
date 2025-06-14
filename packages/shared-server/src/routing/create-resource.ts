import { Id, Identity } from '@benjambles/js-lib/dist/index.js';
import { Context } from 'koa';
import router from 'koa-joi-router';
import { Select } from 'ts-toolbelt/out/List/Select.js';
import { catchJoiErrors } from '../koa/middleware/errors/catch-joi-errors.js';
import { getAccessMiddleware } from '../koa/middleware/get-access-middleware.js';
import { buildJoiSpec } from '../utils/joi/build-joi-spec.js';
import { KoaContext } from '../utils/joi/context/context.js';
import { ApiDoc, RequiredHandlers, RouteHandlers } from '../utils/joi/openapi-to-joi.js';
import { getAccessMap } from '../utils/routes/get-access-map.js';
import { getHTTPMethods } from '../utils/routes/get-http-methods.js';
import { getDataMiddleware, noContent } from '../utils/routes/responses.js';

const defaultData = {
    accessMap: {},
    operations: {},
};

//#region Types
interface ResourceBinder<A extends ApiDoc, D extends ResourceData = typeof defaultData> {
    access: <K extends string, H extends (ctx: Context) => boolean>(
        key: K,
        handler: H,
    ) => ResourceBinder<A, D & { accessMap: { [key in K]: CallBackSignature<H> } }>;
    get: () => {
        accessMap: Id<D['accessMap']>;
        apiDoc: A;
        operations: Id<D['operations']>;
    };
    operation: <
        K extends Exclude<RequiredHandlers<A>, 'sendOptions' | keyof D['operations']>,
    >(
        key: K,
        handler: OperationHandler<A, K>,
    ) => ResourceBinder<A, D & { operations: { [key in K]: OperationHandler<A, K> } }>;
}

export interface ResourceData {
    accessMap: {
        [key: string]: (ctx: KoaContext<any, any>) => boolean;
    };
    operations: {
        [key: string]: (ctx: KoaContext<any, any>) => unknown;
    };
}

export interface ResourceConfig extends ResourceData {
    apiDoc: ApiDoc;
}

type OperationHandler<A extends ApiDoc, K extends string> = Select<
    RouteHandlers<A>,
    { operationId: K }
>[0]['handler'];

type CallBackSignature<H extends (ctx: Context) => unknown> = H extends (
    ctx: infer Ctx,
) => infer R
    ? (ctx: Ctx) => R
    : never;
//#endregion Types

type RouteConfig = {
    method: string;
    path: string;
    operationId: string;
    handler: (ctx) => Promise<any>;
};

export type ClientApi<T extends ApiDoc> = Identity<{
    [key in Exclude<RequiredHandlers<T>, 'sendOptions'>]: GetParams<
        Select<RouteHandlers<T>, { operationId: key }>[0]
    >;
}>;

export type GetParams<T extends RouteConfig> = [
    T['path'],
    T['method'],
    Parameters<T['handler']>[0] extends KoaContext<infer Params, any, any>
        ? Params
        : never,
    Parameters<T['handler']>[0] extends KoaContext<any, any, infer Resp>
        ? Resp extends { status: number; body: infer Body }
            ? Body
            : void
        : void,
];

export function createResource<T extends ApiDoc>(apiDoc: T): ResourceBinder<T> {
    /*
     *   This is somewhat of an antipattern due to the self reference preventing GC
     *   However the memory footprint is small enough due to the limited number of
     *   resources for it to not be an issue for now.
     */
    function resource(data) {
        return {
            access(tag, handler) {
                data.accessMap[tag] = handler;

                return resource(data);
            },
            get() {
                return data;
            },
            operation(key, handler) {
                data.operations[key] = handler;
                return resource(data);
            },
        };
    }

    return resource({
        apiDoc,
        accessMap: {},
        operations: {},
    });
}

export function getRouter(
    resource: ResourceConfig,
    prefix = '',
    validateOutput: boolean = false,
) {
    const routeMap = Object.entries(resource.apiDoc.paths)
        .map(([path, pathConfig]) => {
            const sendOptions = getSendOptions(Object.keys(pathConfig));

            return Object.entries(pathConfig).map(([method, methodConfig]) => {
                return {
                    method,
                    path,
                    handler: [
                        catchJoiErrors,
                        getAccessMiddleware(
                            getAccessMap(resource.accessMap),
                            methodConfig.security,
                        ),
                        getDataMiddleware(
                            methodConfig.operationId === 'sendOptions'
                                ? sendOptions
                                : resource.operations[methodConfig.operationId],
                        ),
                    ],
                    validate: buildJoiSpec(
                        router.Joi,
                        methodConfig,
                        validateOutput,
                        resource.apiDoc['components'],
                    ),
                };
            });
        })
        .flat();

    return router().route(routeMap).prefix(prefix).middleware();
}

function getSendOptions(verbs: string[]) {
    // TODO: Decide if I send all possible paths/HTTP options as body
    return async (ctx: Context) => {
        ctx.set('Allow', verbs.reduce(getHTTPMethods, []).join(', ').toUpperCase());
        return noContent();
    };
}
