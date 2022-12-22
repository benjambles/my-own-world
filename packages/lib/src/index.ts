export type KeyLike = string | number | symbol;
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
    ? 1
    : 2
    ? true
    : false;

export type WithKey<K extends KeyLike, R = any> = {
    [k in K]: R;
};

export type ToUnion<Arr> = Arr extends ReadonlyArray<string> ? Arr[number] : never;

export type ObjectValues<T> = T[keyof T];

export type PartialBy<T, K extends keyof T> = Merge<Omit<T, K>, Partial<T>>;

export type Merge<F, S, M = F & S> = {
    [k in keyof M]: k extends keyof S ? S[k] : M[k];
};
