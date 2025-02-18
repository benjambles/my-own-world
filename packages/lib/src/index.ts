export type Equal<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

export type KeyLike = string | number | symbol;

export type WithKey<K extends KeyLike, R = unknown> = {
    [k in K]: R;
};

export type ToUnion<Arr> = Arr extends ReadonlyArray<string> ? Arr[number] : never;

export type ObjectValues<T> = T[keyof T];

export type PartialBy<T, K extends keyof T> = Merge<Omit<T, K>, Partial<T>>;

export type Merge<F, S, M = F & S> = {
    [k in keyof M]: k extends keyof S ? S[k] : M[k];
};

export type TupleToUnion<T extends ArrayLike<unknown>> =
    T extends ArrayLike<unknown> ? T[number] : never;

export type ObjectEntries<T, K extends keyof T = keyof T> = K extends K
    ? [K, T[K] extends undefined | infer Type ? Type : undefined]
    : never;

export type UnionToTuple<T> =
    UnionToFnInsertion<T> extends () => infer R
        ? [...UnionToTuple<Exclude<T, R>>, R]
        : [];

type UnionToFnInsertion<T> = (
    T extends unknown ? (arg: () => T) => unknown : never
) extends (arg: infer P) => unknown
    ? P
    : never;

export type Simplify<Type> = Type extends unknown[] | Date ? Type : Id<Type>;

export type Id<T> = object & { [P in keyof T]: T[P] };

export type Identity<T> = T extends object
    ? {
          [P in keyof T]: Identity<T[P]>;
      }
    : T;

export type DeepPartial<T> = T extends object
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T;
