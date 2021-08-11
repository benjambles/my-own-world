/**
 *
 * @param param
 * @param fallback
 */
export const paramToNumber = (param: string | string[], fallback: number): number => {
    try {
        const value = Array.isArray(param) ? param[0] : param;
        const num = parseInt(value, 10);
        return Number.isNaN(num) ? fallback : num;
    } catch (e) {
        return fallback;
    }
};
