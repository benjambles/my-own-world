import { bHash, compareBHash } from '../blowfish';

const testStr = 'this is my value';
const testHash = '$2b$10$NByGLHmirFZGuUgMfO0QWu2.p7EV2KWBoQ68I.KVTi2l/v95FLkFS';

test('bHash', async () => {
    const result = await bHash(testStr);
    expect(result).toMatch(/\$2[ayb]\$10\$.{53}/);
});

test('compareBHash', async () => {
    const result = await compareBHash(testStr, testHash);
    expect(result).toBeTruthy();
});
