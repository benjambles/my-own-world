import { some, none } from 'ts-option';

export const stringifyJSON = (data) => {
    try {
        return some(JSON.stringify(data));
    } catch (e) {
        return none;
    }
};
