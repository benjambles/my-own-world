import { option, Option } from 'ts-option';

export function maybeHead<T>(arr: T[]): Option<T> {
    return option(arr[0]);
}
