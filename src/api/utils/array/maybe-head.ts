import { option, Option } from 'ts-option';

export const maybeHead = <T>(arr: T[]): Option<T> => option(arr[0]);
