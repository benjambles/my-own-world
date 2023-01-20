import { ObjectEntries, UnionToTuple } from '@benjambles/js-lib/dist/index.js';
import { HTTPVerbs } from '../routes/get-http-methods.js';
import { ContextFromParams } from './context/context.js';
import {
    ApplicationJson,
    MaybeBodyContext,
    RequestBody,
    TextPlain,
} from './context/request-body.js';
import { Param } from './context/request-parameters.js';
import { MaybeResponseBody } from './responses/openapi-to-types.js';

export type RouteHandlers<C extends ApiDoc> = UnionToTuple<
    FlatArray<AllPaths<C, ExpectedRoutes<C>>, 1>
>;

export type RequiredHandlers<Doc extends ApiDoc> = OperationIds<OperationIdsPerPath<Doc>>;

export type ApiDoc = {
    readonly components?: {
        readonly schemas?: {
            readonly [key: string]: any;
        };
    };
    readonly paths: {
        readonly [key: string]: {
            [K in HTTPVerbs]?: MethodSchema;
        };
    };
};

export type MethodSchema = {
    readonly operationId: string;
    readonly parameters?: ReadonlyArray<Param>;
    readonly requestBody?: RequestBody;
    readonly security?: ReadonlyArray<{
        readonly [type: string]: readonly string[];
    }>;
    readonly responses?: OK | NoContent | Created;
};

export type OK = {
    '200': {
        description: string;
        content: ApplicationJson | TextPlain;
    };
};

export type Created = {
    '201': {
        description: string;
        content: ApplicationJson | TextPlain;
    };
};

export type NoContent = {
    '204': {
        description: string;
    };
};

type OperationIdsPerPath<T extends ApiDoc> = T extends ApiDoc
    ? {
          [K in keyof T['paths']]: T['paths'][K] extends object
              ? [
                    T['paths'][K][keyof T['paths'][K]] extends {
                        operationId: string;
                    }
                        ? T['paths'][K][keyof T['paths'][K]]['operationId']
                        : never,
                ]
              : never;
      }
    : never;

type OperationIds<T extends { [key: string]: string[] }> = T extends {
    [key: string]: string[];
}
    ? T[keyof T] extends string[]
        ? T[keyof T][number]
        : never
    : never;

// type PathHandlers<T extends ApiDoc> = T extends ApiDoc
// ? {
//       [K in keyof T['paths']]: T['paths'][K] extends object
//           ? T['paths'][K][keyof T['paths'][K]]
//           : never;
//   }
// : never;

// export type FlatPathHandlers<T extends ApiDoc> =
//     PathHandlers<T>[keyof PathHandlers<T>] extends object
//         ? {
//               [key in PathHandlers<T>[keyof PathHandlers<T>]['operationId']]: (
//                   ctx: Context &
//                       ContextFromParams<
//                           PathHandlers<T>[keyof PathHandlers<T>]['parameters']
//                       >,
//               ) => any;
//           }
//         : never;

type ExpectedRoutes<A extends ApiDoc> = UnionToTuple<keyof A['paths']>;

type AllPaths<
    Doc extends ApiDoc,
    P extends any[],
    Result extends any[] = [],
> = P extends [infer First extends keyof Doc['paths'], ...infer Rest]
    ? AllPaths<Doc, Rest, [...Result, MethodsPerRoute<Doc['paths'], First>]>
    : Result;

type MethodsPerRoute<
    Paths extends ApiDoc['paths'],
    K extends keyof Paths = keyof Paths,
> = ToJoiRouter<UnionToTuple<[K, ...ObjectEntries<Paths[K]>]>>;

type ToJoiRouter<T extends any[], Result extends any[] = []> = T extends [
    infer RouteSpec extends [string, string, MethodSchema],
    ...infer Rest,
]
    ? ToJoiRouter<
          Rest,
          [
              ...Result,
              {
                  path: RouteSpec[0];
                  method: RouteSpec[1];
                  operationId: RouteSpec[2]['operationId'];
                  handler: (
                      ctx: ContextFromParams<
                          RouteSpec[2]['parameters'],
                          MaybeBodyContext<RouteSpec[2]['requestBody']>,
                          MaybeResponseBody<RouteSpec[2]['responses']>
                      >,
                  ) => Promise<MaybeResponseBody<RouteSpec[2]['responses']>>;
              },
          ]
      >
    : Result;
