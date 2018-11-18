import { isNil } from '../';

export function dbFormat(data: object): iDB.kv {
    return {
        keys: Object.keys(data),
        values: Object.values(data)
    };
}

export function result(error: string, data: any): never | any {
    if (isNil(data)) {
        throw new Error(error);
    }

    return data;
}
