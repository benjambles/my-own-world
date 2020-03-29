import getAccessMap from '../../security/get-access-map';
import { getAccessChecker } from '../get-access-checker';
import * as Koa from 'koa';

test('getAccessChecker', async () => {
    const checkerNoMap = getAccessChecker();
    const err = (code, msg) => {
        throw new Error(msg);
    };

    // No authorization needed
    await expect(
        checkerNoMap({ throw: err } as Koa.Context, async () => {})
    ).resolves.not.toThrow();

    const checkerWithMap = getAccessChecker(getAccessMap());

    // Passed roles and data don't match map
    await expect(
        checkerWithMap(
            { throw: err, state: { accessRoles: ['role:owner'], user: {} } } as Koa.Context,
            async () => {}
        )
    ).rejects.toThrow();

    // Passed roles and state data matches map
    await expect(
        checkerWithMap(
            {
                throw: err,
                state: { accessRoles: ['role:user', 'role:owner'], user: {} },
            } as Koa.Context,
            async () => {}
        )
    ).resolves.not.toThrow();
});
