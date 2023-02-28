import { Id } from '@benjambles/js-lib/dist/index.js';
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
        ? { body: Id<ContextFromBody<BodyConfig['content'], Components>> }
        : {
              body?: Id<ContextFromBody<BodyConfig['content'], Components>>;
          }
    : {};
