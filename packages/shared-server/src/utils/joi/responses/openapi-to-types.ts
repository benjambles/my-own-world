import { Identity } from '@benjambles/js-lib/src/index.js';
import { BodyMimes, ContextFromBody } from '../context/schemas.js';
import { MethodSchema } from '../openapi-to-joi.js';

export type ValidResponses = OK | Created | NoContent;

export type MaybeResponseBody<
    M,
    Components extends {} = {},
> = M extends MethodSchema['responses']
    ? M extends OK
        ? { status: 200; body: ContextFromBody<M['200']['content'], Components> }
        : M extends Created
        ? { status: 201; body: ContextFromBody<M['201']['content'], Components> }
        : M extends NoContent
        ? { status: 204 }
        : any
    : any;

export type MaybeHandlerResponse<
    M,
    Components extends {} = {},
> = M extends MethodSchema['responses']
    ? M extends OK
        ? Identity<ContextFromBody<M['200']['content'], Components>>
        : M extends Created
        ? Identity<ContextFromBody<M['201']['content'], Components>>
        : M extends NoContent
        ? void
        : any
    : any;

type OK = {
    '200': {
        description: string;
        content: BodyMimes;
    };
};

type Created = {
    '201': {
        description: string;
        content: BodyMimes;
    };
};

type NoContent = {
    '204': {
        description: string;
    };
};
