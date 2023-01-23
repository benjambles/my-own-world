import { Id } from '@benjambles/js-lib/dist/index.js';
import { BodyMimes, ContextFromBody } from './schemas.js';

export type RequestBody = {
    required: boolean;
    content: BodyMimes;
};

export type MaybeBodyContext<
    BodyConfig,
    Components extends {} = {},
> = BodyConfig extends RequestBody
    ? BodyConfig['required'] extends true
        ? { body: Id<ContextFromBody<BodyConfig['content'], Components>> }
        : {
              body?: Id<ContextFromBody<BodyConfig['content'], Components>>;
          }
    : {};
