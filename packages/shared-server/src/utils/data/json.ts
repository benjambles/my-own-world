import { none, some } from 'ts-option';

export function stringifyJson(data) {
    try {
        return some(JSON.stringify(data));
    } catch (e) {
        return none;
    }
}

export function parseJson(data: string) {
    try {
        return some(JSON.parse(data) as unknown);
    } catch (e) {
        return none;
    }
}
