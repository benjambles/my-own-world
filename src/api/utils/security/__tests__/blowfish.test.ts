import { bHash, compareBHash } from '../blowfish';

test('bHash', async () => {
    const result = await bHash('this is my value');
    expect(result).toMatch(/\$2[ayb]\$10\$.{53}/);
});

test('compareBHash', async () => {
    await expect(
        compareBHash(
            'this is my value',
            '$2b$10$NByGLHmirFZGuUgMfO0QWu2.p7EV2KWBoQ68I.KVTi2l/v95FLkFS'
        )
    ).resolves.toBeTruthy();

    await expect(
        compareBHash(
            'this is not my value',
            '$2b$10$NByGLHmirFZGuUgMfO0QWu2.p7EV2KWBoQ68I.KVTi2l/v95FLkFS'
        )
    ).rejects.toThrow();
});
