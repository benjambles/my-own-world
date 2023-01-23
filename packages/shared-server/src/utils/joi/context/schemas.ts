import {
    Id,
    ObjectValues,
    PartialBy,
    TupleToUnion,
} from '@benjambles/js-lib/src/index.js';
import { Ref } from '../openapi-to-joi.js';

export type ContextFromBody<
    BodyConfig,
    Components extends {} = {},
> = BodyConfig extends BodyMimes
    ? BodyConfig extends ApplicationJson
        ? ParseProp<BodyConfig['application/json']['schema'], Components>
        : string
    : never;

export type BodyMimes = TextPlain | ApplicationJson;

type TextPlain = {
    'text/plain': {
        schema: {
            type: 'string';
        };
    };
};

type ApplicationJson = {
    'application/json': {
        schema: ObjectSchema | ArraySchema | Ref;
    };
};

export type PropertySchemas =
    | StringSchema
    | NumberSchema
    | BooleanSchema
    | ObjectSchema
    | ArraySchema
    | Ref;

export type ObjectSchema = {
    type: 'object';
    required?: readonly string[];
    properties: {
        [key: string]: PropertySchemas;
    };
    default?: any;
};

export type ArraySchema = {
    type: 'array';
    items: StringSchema | NumberSchema | ObjectSchema | ArraySchema | BooleanSchema | Ref;
    default?: boolean;
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

type BooleanSchema = {
    type: 'boolean';
    default?: boolean;
};

//#region Schema Parsing
type ParseProp<
    Prop extends PropertySchemas,
    Components extends {} = {},
> = Prop extends Ref
    ? TypeFromRefSchema<Prop, Components>
    : Prop extends StringSchema
    ? string
    : Prop extends NumberSchema
    ? number
    : Prop extends ArraySchema
    ? TypeFromArraySchema<Prop, Components>
    : Prop extends BooleanSchema
    ? boolean
    : Prop extends ObjectSchema
    ? Id<TypeFromObjectSchema<Prop, Components>>
    : never;

type TypeFromObjectSchema<Schema extends ObjectSchema, Components extends {} = {}> = Id<
    PartialBy<
        ParseProperties<Schema['properties'], Components>,
        GetOptionalProps<Schema, Components>
    >
>;

type ParseProperties<
    Props extends ObjectSchema['properties'],
    Components extends {} = {},
> = {
    -readonly [Key in keyof Props]: ParseProp<Props[Key], Components>;
};

type TypeFromArraySchema<Schema extends ArraySchema, Components extends {} = {}> = Array<
    ParseProp<Schema['items'], Components>
>;

type TypeFromRefSchema<R extends Ref, Components extends {} = {}> = ParseProp<
    GetPropFromRef<R, Components>
>;

type GetOptionalProps<Props extends ObjectSchema, Components extends {} = {}> = Exclude<
    ObjectValues<{
        -readonly [Key in keyof Props['properties']]: PropOrRef<
            Props['properties'][Key],
            Components
        >['default'] extends string | number | boolean
            ? never
            : Key;
    }>,
    TupleToUnion<Props['required']>
>;

type PropOrRef<P extends PropertySchemas, Components> = P extends Ref
    ? GetPropFromRef<P, Components>
    : P;

type GetPropFromRef<R extends Ref, Components extends {} = {}> = Components extends {
    schemas: Record<string, PropertySchemas>;
}
    ? R['$ref'] extends `#/components/schemas/${infer Key}`
        ? Components['schemas'][Key]
        : never
    : never;
//#endregion Schema Parsing
