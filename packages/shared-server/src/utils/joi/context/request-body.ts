import {
    Id,
    ObjectValues,
    PartialBy,
    TupleToUnion,
} from '@benjambles/js-lib/dist/index.js';

export type RequestBody = {
    required: boolean;
    content: TextPlain | ApplicationJson;
};

export type MaybeBodyContext<BodyConfig> = BodyConfig extends RequestBody
    ? BodyConfig['required'] extends true
        ? { body: Id<ContextFromBody<BodyConfig['content']>> }
        : {
              body?: Id<ContextFromBody<BodyConfig['content']>>;
          }
    : {};

type TextPlain = {
    'text/plain': {
        schema: {
            type: 'string';
        };
    };
};

type ApplicationJson = {
    'application/json': {
        schema: ObjectSchema;
    };
};

type PropertySchemas =
    | StringSchema
    | NumberSchema
    | ObjectSchema
    | ArraySchema
    | BooleanSchema;

type ObjectSchema = {
    type: 'object';
    required?: readonly string[];
    properties: {
        [key: string]: PropertySchemas;
    };
    default?: boolean;
};

type StringSchema = {
    type: 'string';
    default?: string;
};

type NumberSchema = {
    type: 'integer';
    default?: number;
};

type ArraySchema = {
    type: 'array';
    items: StringSchema | NumberSchema | ObjectSchema | ArraySchema | BooleanSchema;
    default?: boolean;
};

type BooleanSchema = {
    type: 'boolean';
    default?: boolean;
};

type ContextFromBody<BodyConfig> = BodyConfig extends RequestBody['content']
    ? BodyConfig extends ApplicationJson
        ? ObjectToContext<BodyConfig['application/json']['schema']>
        : string
    : never;

type ObjectToContext<Schema extends ObjectSchema> = PartialBy<
    ParseProperties<Schema['properties']>,
    GetOptionalProps<Schema>
>;

type GetOptionalProps<Props extends ObjectSchema> = Exclude<
    ObjectValues<{
        -readonly [Key in keyof Props['properties']]: Props['properties'][Key]['default'] extends
            | string
            | number
            | boolean
            ? never
            : Key;
    }>,
    TupleToUnion<Props['required']>
>;

type ParseProperties<Props extends ObjectSchema['properties']> = {
    [Key in keyof Props]: Props[Key] extends StringSchema
        ? string
        : Props[Key] extends NumberSchema
        ? number
        : Props[Key] extends BooleanSchema
        ? boolean
        : Props[Key] extends ObjectSchema
        ? Id<ObjectToContext<Props[Key]>>
        : never;
};
