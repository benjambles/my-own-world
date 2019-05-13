import { encryptValue, hmac as getHmac } from './encrpytion';
import { bHash } from './blowfish';
import { cond } from 'ramda';
import { some, none } from 'fp-ts/lib/Option';

const getFormattedData = ({
    encrypted = [],
    salted = [],
    hmac = [],
    readOnly = ['uuid']
}: formatOptions) => async (key: string, value) => {
    return await cond([
        [readOnly.includes, async () => none],
        [encrypted.includes, async () => some(encryptValue(value))],
        [salted.includes, async () => some(await bHash(value))],
        [hmac.includes, async () => some(await getHmac(value))]
    ])(key);
};

export default getFormattedData;
