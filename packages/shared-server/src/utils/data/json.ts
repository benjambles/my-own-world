import { some, none } from 'ts-option';

export function stringifyJSON(data) {
    try {
        return some(JSON.stringify(data));
    } catch (e) {
        return none;
    }
}

export function parseJson(data: string) {
    try {
        return some(JSON.parse(data));
    } catch (e) {
        return none;
    }
}
