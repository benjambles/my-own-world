export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
    ? 1
    : 2
    ? true
    : false;

export type KeyLike = string | number | symbol;

export type WithKey<K extends KeyLike, R = any> = {
    [k in K]: R;
};

export type ToUnion<Arr> = Arr extends ReadonlyArray<string> ? Arr[number] : never;

export type ObjectValues<T> = T[keyof T];

export type PartialBy<T, K extends keyof T> = Merge<Omit<T, K>, Partial<T>>;

export type Merge<F, S, M = F & S> = {
    [k in keyof M]: k extends keyof S ? S[k] : M[k];
};

export type TupleToUnion<T extends ArrayLike<any>> = T extends ArrayLike<any>
    ? T[number]
    : never;

export type ObjectEntries<T, K extends keyof T = keyof T> = K extends K
    ? [K, T[K] extends undefined | infer Type ? Type : undefined]
    : never;

export type UnionToTuple<T> = UnionToFnInsertion<T> extends () => infer R
    ? [...UnionToTuple<Exclude<T, R>>, R]
    : [];

type UnionToFnInsertion<T> = (T extends any ? (arg: () => T) => any : never) extends (
    arg: infer P,
) => any
    ? P
    : never;

export type Simplify<Type> = Type extends any[] | Date ? Type : Id<Type>;

export type Id<T> = {} & { [P in keyof T]: T[P] };

export type Identity<T> = T extends {}
    ? {
          [P in keyof T]: Identity<T[P]>;
      }
    : T;
