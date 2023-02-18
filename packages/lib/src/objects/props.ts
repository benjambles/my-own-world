export function eqProps<T = {}, U extends T = T, V extends T = T>(
    prop: string,
    obj1: U,
    obj2: V,
): boolean {
    return obj1[prop] === obj2[prop];
}

export function getProp<T, K extends keyof T>(key: K, parent: T): T[K] {
    return parent[key];
}

export function setProp<T>(key: string, value: any, parent: T): T {
    return { ...parent, [key]: value };
}
