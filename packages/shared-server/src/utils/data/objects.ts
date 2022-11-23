export function omit<T extends object, K extends keyof T>(...keys: K[]) {
    return (obj: T): Omit<T, K> => {
        const _ = { ...obj };
        keys.forEach((key) => delete _[key]);
        return _;
    };
}
