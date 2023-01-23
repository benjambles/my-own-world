import { ApiDoc, Ref } from '../openapi-to-joi.js';

export type Param = Readonly<{
    in: 'path' | 'query';
    name: string;
    schema: {
        type: 'string' | 'integer';
        default?: any;
        format?: string;
    };
    description?: string;
    required?: boolean;
}>;

/**
 * Param|Ref => { params?: Record<string, number|string>, path?: Record<string, number|string> }
 * Value taken from schema, and key marked as concrete if required or has default value
 */
export type ParseParam<P extends Param | Ref, Components extends {}> = P extends Param
    ? ParamToContext<P>
    : Components extends ApiDoc['components']
    ? P extends { $ref: `#/components/parameters/${infer Name}` }
        ? ParamToContext<Components['parameters'][Name]>
        : never
    : never;

type ParamToContext<P extends Param> = {
    [Key in P['in'] extends 'path' ? 'params' : P['in']]: MaybePartial<
        {
            [key in P['name']]: P['schema']['type'] extends 'integer' ? number : string;
        },
        P
    >;
};

type MaybePartial<T, P extends Param> = P['required'] extends true
    ? T
    : P['schema']['default'] extends string | number | boolean
    ? { [Key in keyof T]: T[Key] | P['schema']['default'] }
    : Partial<T>;
