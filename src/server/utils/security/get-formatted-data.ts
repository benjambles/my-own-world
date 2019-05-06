import * as Maybe from 'folktale/maybe';
import { encryptValue, hmac as getHmac } from './encrpytion';
import { bHash } from './blowfish';
import { cond } from 'ramda';

const getFormattedData = ({
    encrypted = [],
    salted = [],
    hmac = [],
    readOnly = ['uuid']
}: formatOptions) => async (key: string, value) => {
    return await cond([
        [readOnly.includes, async () => Maybe.Nothing()],
        [encrypted.includes, async () => Maybe.Just(encryptValue(value))],
        [salted.includes, async () => Maybe.Just(await bHash(value))],
        [hmac.includes, async () => Maybe.Just(await getHmac(value))]
    ])(key);
};

export default getFormattedData;
