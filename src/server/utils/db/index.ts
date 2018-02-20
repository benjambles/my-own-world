import { isNil } from "../";

export function dbFormat(data: object): any {
    const keys = Object.keys(data).join(",");
    const values = Object.values(data).join(" ,");

    return {
        keys,
        values
    };
}

export function result(error: string, data: any) {
    if (isNil(data)) {
        throw new Error(error);
    }

    return data;
}
