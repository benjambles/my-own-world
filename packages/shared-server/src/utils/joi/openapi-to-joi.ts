import { ObjectEntries, UnionToTuple } from '@benjambles/js-lib/dist/index.js';
import { HTTPVerbs } from '../routes/get-http-methods.js';
import { ContextFromParams } from './context/context.js';
import { MaybeBodyContext, RequestBody } from './context/request-body.js';
import { Param } from './context/request-parameters.js';
import { PropertySchemas } from './context/schemas.js';
import { MaybeResponseBody, ValidResponses } from './responses/openapi-to-types.js';

export type RouteHandlers<C extends ApiDoc> = UnionToTuple<
    FlatArray<AllPaths<C, ExpectedRoutes<C>>, 1>
>;

export type RequiredHandlers<Doc extends ApiDoc> = OperationIds<OperationIdsPerPath<Doc>>;

export type ApiDoc = {
    readonly components?: {
        readonly schemas?: {
            readonly [key: string]: Exclude<PropertySchemas, Ref>;
        };
        readonly parameters?: {
            readonly [key: string]: Param;
        };
    };
    readonly paths: {
        readonly [key: string]: {
            [K in HTTPVerbs]?: MethodSchema;
        };
    };
};

export type Ref = {
    $ref: string;
};

export type MethodSchema = {
    readonly operationId: string;
    readonly parameters?: ReadonlyArray<Param | Ref>;
    readonly requestBody?: RequestBody;
    readonly security?: ReadonlyArray<{
        readonly [type: string]: readonly string[];
    }>;
    readonly responses?: ValidResponses;
};

type OperationIdsPerPath<T extends ApiDoc> = T extends ApiDoc
    ? {
          [K in keyof T['paths']]: [MaybeOperationId<T['paths'][K][keyof T['paths'][K]]>];
      }
    : never;

type MaybeOperationId<Schema> = Schema extends MethodSchema
    ? Schema['operationId']
    : never;

type OperationIds<T extends { [key: string]: string[] }> = T extends {
    [key: string]: string[];
}
    ? T[keyof T] extends string[]
        ? T[keyof T][number]
        : never
    : never;

type ExpectedRoutes<A extends ApiDoc> = UnionToTuple<keyof A['paths']>;

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
                  path: RouteSpec[0];
                  method: RouteSpec[1];
                  operationId: RouteSpec[2]['operationId'];
                  handler: (
                      ctx: ContextFromParams<
                          RouteSpec[2]['parameters'],
                          MaybeBodyContext<RouteSpec[2]['requestBody'], Components>,
                          MaybeResponseBody<RouteSpec[2]['responses'], Components>,
                          Components
                      >,
                  ) => Promise<MaybeResponseBody<RouteSpec[2]['responses'], Components>>;
              },
          ]
      >
    : Result;
