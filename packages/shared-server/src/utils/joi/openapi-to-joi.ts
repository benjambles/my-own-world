import { ObjectEntries, UnionToTuple } from '@benjambles/js-lib/dist/index.js';
import { HTTPVerbs } from '../routes/get-http-methods.js';
import { ContextFromParams } from './context/context.js';
import { MaybeBodyContext, RequestBody } from './context/request-body.js';
import { Param } from './context/request-parameters.js';
import { PropertySchemas } from './context/schemas.js';
import { MaybeResponseBody, ValidResponses } from './responses/openapi-to-types.js';

export type RouteHandlers<C extends ApiDoc> = UnionToTuple<
    FlatArray<AllPaths<C, UnionToTuple<keyof C['paths']>>, 1>
>;

export type RequiredHandlers<Doc extends ApiDoc> = UnionFromProps<
    OperationIdsPerPath<Doc>
>;

export type UnionFromProps<T extends { [key: string]: any[] }> = T extends {
    [key: string]: any[];
}
    ? T[keyof T][number]
    : never;

export type ApiDoc = {
    readonly components?: {
        readonly parameters?: {
            readonly [key: string]: Param;
        };
        readonly schemas?: {
            readonly [key: string]: Exclude<PropertySchemas, Ref>;
        };
    };
    readonly paths: {
        readonly [key: string]: {
            [K in HTTPVerbs]?: MethodSchema;
        };
    };
};

export interface Ref {
    $ref: string;
}

export interface MethodSchema {
    readonly operationId: string;
    readonly parameters?: ReadonlyArray<Param | Ref>;
    readonly requestBody?: RequestBody;
    readonly responses?: ValidResponses;
    readonly security?: ReadonlyArray<{
        readonly [type: string]: readonly string[];
    }>;
}

type OperationIdsPerPath<Doc extends ApiDoc> = {
    [K in keyof Doc['paths']]: [MaybeOperationId<Doc['paths'][K][keyof Doc['paths'][K]]>];
};

type MaybeOperationId<Schema> = Schema extends { operationId: string }
    ? Schema['operationId']
    : never;

type AllPaths<
    Doc extends ApiDoc,
    Paths extends any[],
    Result extends any[] = [],
> = Paths extends [infer First extends keyof Doc['paths'], ...infer Rest]
    ? AllPaths<
          Doc,
          Rest,
          [...Result, MethodsPerRoute<Doc['paths'], First, Doc['components']>]
      >
    : Result;

type MethodsPerRoute<
    Paths extends ApiDoc['paths'],
    K extends keyof Paths = keyof Paths,
    Components extends {} = {},
> = ToJoiRouter<UnionToTuple<[K, ...ObjectEntries<Paths[K]>]>, Components>;

type ToJoiRouter<
    T extends any[],
    Components extends {},
    Result extends any[] = [],
> = T extends [infer RouteSpec extends [string, string, MethodSchema], ...infer Rest]
    ? ToJoiRouter<
          Rest,
          Components,
          [
              ...Result,
              {
                  method: RouteSpec[1];
                  handler: (
                      ctx: ContextFromParams<
                          RouteSpec[2]['parameters'],
                          MaybeBodyContext<RouteSpec[2]['requestBody'], Components>,
                          MaybeResponseBody<RouteSpec[2]['responses'], Components>,
                          { method: RouteSpec[1]; path: RouteSpec[0] },
                          Components
                      >,
                  ) => Promise<MaybeResponseBody<RouteSpec[2]['responses'], Components>>;
                  operationId: RouteSpec[2]['operationId'];
                  path: RouteSpec[0];
              },
          ]
      >
    : Result;
