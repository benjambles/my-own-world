import * as Access from '../../../koa/middleware/set-access-roles.js';
import { getSecurityMiddleware } from '../get-security-middleware.js';

test('getSecurityMiddleware', () => {
    jest.spyOn(Access, 'setAccessRoles').mockImplementation(() => async () => {});

    expect.assertions(7);

    const noSecurityMap = getSecurityMiddleware({});
    expect(noSecurityMap.isDefined).toEqual(true);

    noSecurityMap.map((val) => {
        expect(val).toEqual([]);
    });

    const noJWTMapItem = getSecurityMiddleware({
        security: [{ notJWT: ['item'] }],
    });
    expect(noJWTMapItem.isDefined).toEqual(true);

    noJWTMapItem.map((val) => {
        expect(val).toEqual([]);
    });

    const hasJWTItems = getSecurityMiddleware({
        security: [
            {
                jwt: ['role:admin', 'role:owner'],
            },
        ],
    });
    expect(hasJWTItems.isDefined).toEqual(true);

    expect(Access.setAccessRoles).toHaveBeenCalledTimes(1);
    hasJWTItems.map((val) => {
        expect(typeof val[0]).toEqual('function');
    });
});
