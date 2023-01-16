/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
export function swaggerToJoiType(type: string): string {
    const typesMap = {
        integer: 'number',
        int64: 'integer',
        minLength: 'min',
        maxLength: 'max',
        minimum: 'min',
        maximum: 'max',
    };

    return typesMap[type] ?? type;
}
