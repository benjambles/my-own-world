import {
    Id,
    ObjectValues,
    PartialBy,
    TupleToUnion,
} from '@benjambles/js-lib/dist/index.js';
import { Ref } from '../openapi-to-joi.js';

export type ContextFromBody<
    BodyConfig,
    Components extends {} = {},
> = BodyConfig extends ApplicationJson
    ? ParseProp<BodyConfig['application/json']['schema'], Components>
    : BodyConfig extends TextPlain
    ? string
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
    | ArraySchema
    | BooleanSchema
    | NumberSchema
    | ObjectSchema
    | Ref
    | StringSchema;

export interface ArraySchema {
    type: 'array';
    items: PropertySchemas;
    default?: boolean;
}

export interface ObjectSchema {
    type: 'object';
    required?: readonly string[];
    properties: {
        [key: string]: PropertySchemas;
    };
    default?: any;
}

interface BooleanSchema {
    type: 'boolean';
    default?: boolean;
}

interface NumberSchema {
    type: 'integer';
    default?: number;
    format?: string;
    maximum?: number;
    minimum?: number;
}
interface StringSchema {
    type: 'string';
    default?: string;
    format?: string;
    maxLength?: number;
    minLength?: number;
}

//#region Schema Parsing
type ParseProp<Prop extends PropertySchemas, Components> = Prop extends ArraySchema
    ? TypeFromArraySchema<Prop, Components>
    : Prop extends BooleanSchema
    ? boolean
    : Prop extends NumberSchema
    ? number
    : Prop extends ObjectSchema
    ? Id<TypeFromObjectSchema<Prop, Components>>
    : Prop extends Ref
    ? TypeFromRefSchema<Prop, Components>
    : Prop extends StringSchema
    ? string
    : never;

type TypeFromObjectSchema<Schema extends ObjectSchema, Components> = Id<
    PartialBy<
        ParseProperties<Schema['properties'], Components>,
        GetOptionalProps<Schema, Components>
    >
>;

type ParseProperties<Props extends ObjectSchema['properties'], Components> = {
    -readonly [Key in keyof Props]: ParseProp<Props[Key], Components>;
};

type TypeFromArraySchema<Schema extends ArraySchema, Components> = Array<
    ParseProp<Schema['items'], Components>
>;

type TypeFromRefSchema<R extends Ref, Components> = ParseProp<
    GetPropFromRef<R, Components>,
    Components
>;

type GetOptionalProps<Props extends ObjectSchema, Components> = Exclude<
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

type GetPropFromRef<R extends Ref, Components> = Components extends {
    schemas: Record<string, PropertySchemas>;
}
    ? R['$ref'] extends `#/components/schemas/${infer Key}`
        ? Components['schemas'][Key]
        : never
    : never;
//#endregion Schema Parsing
