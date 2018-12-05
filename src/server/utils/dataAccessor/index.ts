/**
 * Get a nested object member from a delimited namespace string
 * ````
 * var someObject = {
 *    deeply:{
 *        nested:{
 *            key: 'value'
 *        }
 *    },
 *    nonNested: 'otheValue';
 * }
 * Utils.getObjectMemberFromString('deeply.nested.key', someObject);      // 'value'
 * Utils.getObjectMemberFromString('nonNested', someObject);              // 'otherValue'
 * Utils.getObjectMemberFromString('nonExistant', someObject);            // undefined
 * ````
 * @param namespace The string describing the namespace on the object
 * @param obj The object to search
 */
export function getObjectMemberFromString(namespace: string, obj: object): any {
    return prop(namespace.split('.'), obj, undefined);
}

/**
 * Helper function to get prop from a object with default fallback
 * This method accepts either a string or a array
 *
 * @example
 * prop('test', {test: true}, false);
 * prop(['test', 'nested'], {test: {nested: true}}, false);
 *
 * @param paths - The property name to look for
 * @param obj - The object where the property should reside
 */
export function prop(paths: string | string[], obj: object, fallback: any = undefined): any {
    const _paths = Array.isArray(paths) ? paths : [paths];
    let val = obj;
    let idx = 0;

    while (idx < _paths.length) {
        val = val[_paths[idx]];
        idx += 1;
        if (val === undefined) {
            return fallback;
        }
    }
    return val;
}
