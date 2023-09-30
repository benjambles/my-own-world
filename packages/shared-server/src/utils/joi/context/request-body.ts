import { BodyMimes, ContextFromBody } from './schemas.js';

export interface RequestBody {
    content: BodyMimes;
    required: boolean;
}

export type MaybeBodyContext<
    BodyConfig,
    Components extends {} = {},
> = BodyConfig extends RequestBody
    ? BodyConfig['required'] extends true
        ? { body: ContextFromBody<BodyConfig['content'], Components> }
        : {
              body?: ContextFromBody<BodyConfig['content'], Components>;
          }
    : {};
