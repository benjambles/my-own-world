import { decryptValue, encryptValue, hmac } from '../encrpytion';

const testStr = 'this is my value';
const encrpytedResult =
    'aes-256-cbc:25aa7a7bb9f94eaa75535ac7531dabe4:faf9bf3fb566d1a834b4dac62e4650004a26cede3815cc85089730ebf9bde82b';

test('encryptValue', async () => {
    const result = await encryptValue(testStr);
    expect(result).toMatch(/aes-256-cbc:[0-9a-f]{32}:[0-9a-f]{64}/);
});

test('decryptValue', async () => {
    const result = await decryptValue(encrpytedResult);
    expect(result).toEqual(testStr);
});

test('hmac', async () => {
    const expectResult = 'f62636c73acd44a9c04a90f2121f629fff84f9e1a557c59d5720a8011bbb54cb';
    const result = await hmac(testStr);
    expect(result).toEqual(expectResult);
});
