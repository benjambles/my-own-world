import * as security from './index';

const testStr = 'this is my value';
const encrpytedResult =
    'aes-256-cbc:25aa7a7bb9f94eaa75535ac7531dabe4:faf9bf3fb566d1a834b4dac62e4650004a26cede3815cc85089730ebf9bde82b';
const testHash = '$2b$10$NByGLHmirFZGuUgMfO0QWu2.p7EV2KWBoQ68I.KVTi2l/v95FLkFS';

test('encryptValue', async () => {
    const result = await security.encryptValue(testStr);
    expect(result).toMatch(/aes-256-cbc:[0-9a-f]{32}:[0-9a-f]{64}/);
});

test('decryptValue', async () => {
    const result = await security.decryptValue(encrpytedResult);
    expect(result).toEqual(testStr);
});

test('bHash', async () => {
    const result = await security.bHash(testStr);
    console.log(result);
    expect(result).toMatch(/\$2[ayb]\$10\$.{53}/);
});

test('compareBHash', async () => {
    const result = await security.compareBHash(testStr, testHash);
    expect(result).toBeTruthy();
});

test('getToken', async () => {
    const result = await security.getToken({ secret1: 'To be used later' });
    expect(result).toMatch(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[\d\w-]{86}\.[\d\w-]{43}/);
});

test('hmac', async () => {
    const expectResult = 'f62636c73acd44a9c04a90f2121f629fff84f9e1a557c59d5720a8011bbb54cb';
    const result = await security.hmac(testStr);
    expect(result).toEqual(expectResult);
});
