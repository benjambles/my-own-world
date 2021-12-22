/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
export function swaggerToJoiType(type: string): string {
    const typesMap = {
        token: 'string',
        integer: 'number',
        int64: 'integer',
    };

    return typesMap[type] || type;
}
