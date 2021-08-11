/**
 * Converts swagger parameter types to JOI validation types
 * @param type
 */
export const swaggerToJoiType = (type: string): string => {
    const typesMap = {
        token: 'string',
        integer: 'number',
        int64: 'integer',
    };

    return typesMap[type] || type;
};
