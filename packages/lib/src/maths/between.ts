export function between(min: number, max: number, value: number) {
    return Math.max(min, Math.min(max, value));
}
