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

export type TextPlain = {
    'text/plain': {
        schema: {
            type: 'string';
        };
    };
};

export type ApplicationJson = {
    'application/json': {
        schema: ObjectSchema | ArraySchema;
    };
};

export type PropertySchemas =
    | StringSchema
    | NumberSchema
    | BooleanSchema
    | ObjectSchema
    | ArraySchema;

export type ObjectSchema = {
    type: 'object';
    required?: readonly string[];
    properties: {
        [key: string]: PropertySchemas;
    };
    default?: any;
};

export type Ref = {
    $ref: string;
};

type StringSchema = {
    type: 'string';
    default?: string;
    format?: string;
    maxLength?: number;
    minLength?: number;
};

type NumberSchema = {
    type: 'integer';
    default?: number;
    format?: string;
    maximum?: number;
    minimum?: number;
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

export type ContextFromBody<BodyConfig> = BodyConfig extends RequestBody['content']
    ? BodyConfig extends ApplicationJson
        ? BodyConfig['application/json']['schema'] extends ObjectSchema
            ? ObjectToContext<BodyConfig['application/json']['schema']>
            : BodyConfig['application/json']['schema'] extends ArraySchema
            ? ArrayToContext<BodyConfig['application/json']['schema']>
            : never
        : string
    : never;

export type ParseRef<
    R extends Ref,
    Schemas extends ObjectSchema['properties'] = {},
> = R extends `#/components/schema/${infer Key}` ? Schemas[Key] : never;

type ObjectToContext<Schema extends ObjectSchema> = Id<
    PartialBy<ParseProperties<Schema['properties']>, GetOptionalProps<Schema>>
>;

type ArrayToContext<Schema extends ArraySchema> = Array<ParseProp<Schema['items']>>;

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
    -readonly [Key in keyof Props]: ParseProp<Props[Key]>;
};

type ParseProp<Prop extends PropertySchemas> = Prop extends StringSchema
    ? string
    : Prop extends NumberSchema
    ? number
    : Prop extends ArraySchema
    ? ArrayToContext<Prop>
    : Prop extends BooleanSchema
    ? boolean
    : Prop extends ObjectSchema
    ? Id<ObjectToContext<Prop>>
    : never;
