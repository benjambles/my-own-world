import { Option } from 'ts-option';

export const getValues = <T>(arr: Option<T>[]): T[] => {
    return arr.filter((val) => val.isDefined).map((val) => val.get);
};
