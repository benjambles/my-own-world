import { gt } from 'ramda';

export default function hasValues(arr: any[]) {
    return gt(arr.length, 0);
}
