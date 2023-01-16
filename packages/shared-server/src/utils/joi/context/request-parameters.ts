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

export type ParamToContext<P extends Param> = {
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
