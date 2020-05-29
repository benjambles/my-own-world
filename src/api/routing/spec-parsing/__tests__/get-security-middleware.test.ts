import { setAccessRoles } from '../../../utils/middleware/set-access-roles';
import { getSecurityMiddleware } from '../get-security-middleware';

jest.mock('../../../utils/middleware/set-access-roles', () => ({
    default: jest.fn().mockImplementation(() => async () => {}),
}));

test('getSecurityMiddleware', () => {
    expect.assertions(7);

    const noSecurityMap = getSecurityMiddleware({});
    expect(noSecurityMap.isSome()).toEqual(true);

    noSecurityMap.map((val) => {
        expect(val).toEqual([]);
    });

    const noJWTMapItem = getSecurityMiddleware({
        security: [{ notJWT: ['item'] }],
    });
    expect(noJWTMapItem.isSome()).toEqual(true);

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
    expect(hasJWTItems.isSome()).toEqual(true);

    expect(setAccessRoles).toHaveBeenCalledTimes(1);
    hasJWTItems.map((val) => {
        expect(typeof val[0]).toEqual('function');
    });
});
