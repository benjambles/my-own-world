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

    const noHTTPMapItem = getSecurityMiddleware({
        security: [{ notHTTP: ['item'] }],
    });
    expect(noHTTPMapItem.isDefined).toEqual(true);

    noHTTPMapItem.map((val) => {
        expect(val).toEqual([]);
    });

    const hasHTTPItems = getSecurityMiddleware({
        security: [
            {
                http: ['role:admin', 'role:owner'],
            },
        ],
    });
    expect(hasHTTPItems.isDefined).toEqual(true);

    expect(Access.setAccessRoles).toHaveBeenCalledTimes(1);
    hasHTTPItems.map((val) => {
        expect(typeof val[0]).toEqual('function');
    });
});
