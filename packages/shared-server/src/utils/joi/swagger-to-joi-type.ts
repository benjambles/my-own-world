/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
export function swaggerToJoiType(type: string): string {
    const typesMap = {
        int64: 'integer',
        integer: 'number',
        maximum: 'max',
        maxLength: 'max',
        minimum: 'min',
        minLength: 'min',
    };

    return typesMap[type] ?? type;
}
