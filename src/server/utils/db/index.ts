import { isNil } from "../";

export function dbFormat(data: object): any {
    return {
        keys: Object.keys(data),
        values: Object.values(data)
    };
}

export function result(error: string, data: any) {
    if (isNil(data)) {
        throw new Error(error);
    }

    return data;
}
