import Koa from 'koa';
import { getAccessMap } from '../../../utils/routes/get-access-map.js';
import { getAccessMiddleware } from '../get-access-middleware.js';

test('getAccessMiddleware', async () => {
    const checkerNoMap = getAccessMiddleware();
    const err = (code, msg) => {
        throw new Error(msg);
    };

    // No authorization needed
    await expect(
        checkerNoMap({ throw: err, state: {} } as Koa.Context, async () => {}),
    ).resolves.not.toThrow();

    const checkerWithMap = getAccessMiddleware(getAccessMap(), [
        { http: ['role:admin', 'role:user'] },
    ]);

    // Passed roles and data don't match map
    const ctxFail: unknown = {
        throw: err,
        state: { user: {} },
    };
    await expect(() =>
        checkerWithMap(ctxFail as Koa.Context, async () => {}),
    ).rejects.toThrow();

    // Passed roles and state data matches map
    const ctxPass: unknown = {
        throw: err,
        state: { user: { sub: 'some-key' } },
    };
    await expect(
        checkerWithMap(ctxPass as Koa.Context, async () => {}),
    ).resolves.not.toThrow();
});
