import { isNil } from '../compares';

/**
 *
 * @param error
 * @param data
 */
export function result(error: string, data: any): never | any {
    if (isNil(data)) {
        throw new Error(error);
    }

    return data;
}
