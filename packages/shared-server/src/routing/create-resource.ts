import { Id } from '@benjambles/js-lib/src/index.js';
import { Context, Next } from 'koa';
import JoiRouter, { Spec } from 'koa-joi-router';
import { Filter } from 'ts-toolbelt/out/List/Filter.js';
import { catchJoiErrors } from '../koa/middleware/catch-joi-errors.js';
import { getAccessMiddleware } from '../koa/middleware/get-access-middleware.js';
import { buildJoiSpec } from '../utils/joi/build-joi-spec.js';
import { KoaContext } from '../utils/joi/context/context.js';
import { ApiDoc, RequiredHandlers, RouteHandlers } from '../utils/joi/openapi-to-joi.js';
import { getAccessMap } from '../utils/routes/get-access-map.js';
import { getHTTPMethods } from '../utils/routes/get-http-methods.js';
import { getDataMiddleware } from '../utils/routes/responses.js';
import { createRoute } from './create-route.js';

const defaultData = {
    operations: {},
    accessMap: {},
};

//#region Types
interface ResourceBinder<A extends ApiDoc, D extends ResourceData = typeof defaultData> {
    get: () => {
        accessMap: Id<D['accessMap']>;
        operations: Id<D['operations']>;
        apiDoc: A;
    };
    operation: <
        K extends Exclude<RequiredHandlers<A>, 'sendOptions' | keyof D['operations']>,
    >(
        key: K,
        handler: OperationHandler<A, K>,
    ) => ResourceBinder<A, D & { operations: { [key in K]: OperationHandler<A, K> } }>;
    access: <K extends string, H extends (ctx: Context) => boolean>(
        key: K,
        handler: H,
    ) => ResourceBinder<A, D & { accessMap: { [key in K]: CallBackSignature<H> } }>;
}

export interface ResourceData {
    operations: {
        [key: string]: (ctx: KoaContext<any, any>) => unknown;
    };
    accessMap: {
        [key: string]: (ctx: KoaContext<any, any>) => boolean;
    };
}

export interface ResourceConfig extends ResourceData {
    apiDoc: ApiDoc;
}

type OperationHandler<A extends ApiDoc, K extends string> = Filter<
    RouteHandlers<A>,
    { operationId: Exclude<RequiredHandlers<A>, K> }
>[0]['handler'];

type CallBackSignature<H extends (ctx: Context) => unknown> = H extends (
    ctx: infer Ctx,
) => infer R
    ? (ctx: Ctx) => R
    : never;
//#endregion Types

export function createResource<T extends ApiDoc>(apiDoc: T): ResourceBinder<T> {
    const resource = (data) => {
        return {
            get() {
                return {
                    ...data,
                    apiDoc,
                };
            },
            operation(key, handler) {
                data.operations[key] = handler;
                return resource(data);
            },
            access(tag, handler) {
                data.accessMap[tag] = handler;

                return resource(data);
            },
        };
    };

    return resource({
        operations: {},
        accessMap: {},
    });
}

export function getRouter(resource, prefix = '', validateOutput: boolean = false) {
    const routeMap = getRouteMap(resource, validateOutput);
    return createRoute(prefix, routeMap).middleware();
}

function getRouteMap(data: ResourceConfig, validateOutput: boolean): Spec[] {
    return Object.entries(data.apiDoc.paths)
        .map(([path, pathConfig]) => {
            return Object.entries(pathConfig).map(([method, methodConfig]) => {
                const handler = [
                    catchJoiErrors(validateOutput),
                    getAccessMiddleware(
                        getAccessMap(data.accessMap),
                        methodConfig.security,
                    ),
                    getDataMiddleware(
                        undefined,
                        methodConfig.operationId === 'sendOptions'
                            ? getSendOptions(Object.keys(pathConfig))
                            : data.operations[methodConfig.operationId],
                    ),
                ];

                return {
                    method,
                    path,
                    handler,
                    validate: buildJoiSpec(
                        JoiRouter.Joi,
                        methodConfig,
                        validateOutput,
                        data.apiDoc['components'],
                    ),
                };
            });
        })
        .flat();
}

function getSendOptions(verbs: string[]) {
    // TODO: Decide if I send all possible paths/HTTP options as body
    return async (ctx: Context, next: Next) => {
        ctx.set('Allow', verbs.reduce(getHTTPMethods, []).join(', ').toUpperCase());
        await next();
    };
}
