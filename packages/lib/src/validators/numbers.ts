export function isPositiveInt(value: number): boolean {
    return value > 0;
}

export function isNegativeInt(value: number): boolean {
    return value < 0;
}

export function isNumber(value: number): boolean {
    return typeof value === 'number' && !isNaN(value);
}

export function isGt(max: number, value: number): boolean {
    return value > max;
}

export function isGte(max: number, value: number): boolean {
    return value >= max;
}

export function isLt(min: number, value: number): boolean {
    return value < min;
}

export function isLte(min: number, value: number): boolean {
    return value <= min;
}
