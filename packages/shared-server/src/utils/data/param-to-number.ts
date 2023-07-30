/**
 *
 * @param param
 * @param fallback
 */
export function paramToNumber(param: string | string[], fallback: number): number {
    const value = Array.isArray(param) ? param[0] : param;
    const num = parseInt(value, 10);
    return Number.isNaN(num) ? fallback : num;
}
