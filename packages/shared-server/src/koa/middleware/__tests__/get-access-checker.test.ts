import Koa from 'koa';
import { getAccessMap } from '../../../utils/routes/get-access-map.js';
import { getAccessChecker } from '../get-access-checker.js';

test('getAccessChecker', async () => {
    const checkerNoMap = getAccessChecker();
    const err = (code, msg) => {
        throw new Error(msg);
    };

    // No authorization needed
    await expect(
        checkerNoMap({ throw: err } as Koa.Context, async () => {}),
    ).resolves.not.toThrow();

    const checkerWithMap = getAccessChecker(getAccessMap());

    // Passed roles and data don't match map
    const ctxFail: unknown = {
        throw: err,
        state: { accessRoles: ['role:admin'], user: {} },
    };
    await expect(() =>
        checkerWithMap(ctxFail as Koa.Context, async () => {}),
    ).rejects.toThrow();

    // Passed roles and state data matches map
    const ctxPass: unknown = {
        throw: err,
        state: { accessRoles: ['role:user', 'role:owner'], user: { _id: 'some-key' } },
    };
    await expect(
        checkerWithMap(ctxPass as Koa.Context, async () => {}),
    ).resolves.not.toThrow();
});
