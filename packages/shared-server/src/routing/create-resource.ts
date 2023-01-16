import { Context, Next } from 'koa';
import JoiRouter, { Spec } from 'koa-joi-router';
import Router from 'koa-router';
import { Filter } from 'ts-toolbelt/out/List/Filter.js';
import { catchJoiErrors } from '../koa/middleware/catch-joi-errors.js';
import { getAccessMiddleware } from '../koa/middleware/get-access-middleware.js';
import { getHTTPMethods } from '../utils/routes/get-http-methods.js';
import { getAccessMap } from '../utils/routes/get-access-map.js';
import { getDataMiddleware } from '../utils/routes/responses.js';
import { createRoute } from './create-route.js';
import { ApiDoc, RequiredHandlers, RouteHandlers } from '../utils/joi/openapi-to-joi.js';
import { buildJoiSpec } from '../utils/joi/build-joi-spec.js';

const defaultData = {
    operations: {},
    accessMap: {},
};

//#region Types
type ResourceBinder<A extends ApiDoc, D extends ResourceData = typeof defaultData> = {
    middleware: (prefix: string) => Router;
    operation: <
        K extends Exclude<RequiredHandlers<A>, 'sendOptions' | keyof D['operations']>,
        H extends (ctx: Context) => unknown,
    >(
        key: K,
        handler: H extends (ctx: Context) => unknown
            ? OperationHandler<A, K>[0]['handler']
            : never,
    ) => ResourceBinder<
        A,
        D & { operations: { [key in K]: OperationHandler<A, K>[0]['handler'] } }
    >;
    access: <K extends string, H extends (ctx: Context) => unknown>(
        key: K,
        handler: H,
    ) => ResourceBinder<A, D & { accessMap: { [key in K]: CallBackSignature<H> } }>;
};

type ResourceData = {
    operations: {
        [key: string]: (ctx: Context) => unknown;
    };
    accessMap: {
        [key: string]: (ctx: Context) => boolean;
    };
};

type OperationHandler<A extends ApiDoc, K extends string> = Filter<
    RouteHandlers<A>,
    { operationId: Exclude<RequiredHandlers<A>, K> }
>;

type CallBackSignature<H extends (ctx: Context) => unknown> = H extends (
    ctx: infer Ctx,
) => infer R
    ? (ctx: Ctx) => R
    : never;
//#endregion Types

export function createResource<T extends ApiDoc>(apiDoc: T): ResourceBinder<T> {
    const resource = (data) => {
        return {
            middleware(prefix: string) {
                const routeMap = getRouteMap(apiDoc, data);
                return createRoute(prefix, routeMap);
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

function getRouteMap(apiDoc: ApiDoc, data: ResourceData): Spec[] {
    return Object.entries(apiDoc.paths)
        .map(([path, pathConfig]) => {
            return Object.entries(pathConfig).map(([method, methodConfig]) => {
                const handler =
                    methodConfig.operationId === 'sendOptions'
                        ? getSendOptions(Object.keys(pathConfig))
                        : data.operations[methodConfig.operationId];

                const spec: Spec = {
                    method,
                    path,
                    handler: [
                        catchJoiErrors,
                        getAccessMiddleware(
                            methodConfig.security,
                            getAccessMap(data.accessMap),
                        ),
                        getDataMiddleware(undefined, handler),
                        // In non prod modes we'd want to display response validations too
                    ],
                };

                if (methodConfig.parameters?.length || methodConfig.requestBody) {
                    spec.validate = buildJoiSpec(JoiRouter.Joi, methodConfig);
                }

                return spec;
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
