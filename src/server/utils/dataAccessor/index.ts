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
 * Utils.getObjectMemberFromString(someObject, 'deeply.nested.key');      // 'value'
 * Utils.getObjectMemberFromString(someObject, 'nonNested');              // 'otherValue'
 * Utils.getObjectMemberFromString(someObject, 'nonExistant');            // false
 * ````
 * @param {object} obj The object to search
 * @param {string} namespace The string describing the namespace on the object
 * @param {string} delimiter Optional delimiter, defaults to '.'
 * @return {mixed} The namespaced member or false
 */
export function getObjectMemberFromString(namespace, obj) {
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
 * @param {(string|array)} paths - The property name to look for
 * @param {object} obj - The object where the property should reside
 * @return {*} - The property value
 */
export function prop(paths, obj, fallback = undefined) {
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
