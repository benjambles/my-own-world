import { ContextFromBody } from '../context/request-body.js';
import { Created, MethodSchema, NoContent, OK } from '../openapi-to-joi.js';

export type MaybeResponseBody<M> = M extends MethodSchema['responses']
    ? M extends OK
        ? { status: 200; data: ContextFromBody<M['200']['content']> }
        : M extends Created
        ? { status: 201; data: ContextFromBody<M['201']['content']> }
        : M extends NoContent
        ? { status: 204 }
        : any
    : any;
