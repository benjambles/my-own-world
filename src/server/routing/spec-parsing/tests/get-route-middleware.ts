import getRouteMiddleware from '../get-route-middleware';
import { None } from 'fp-ts/lib/Option';
import catchJoiErrors from '../../../utils/middleware/catch-joi-errors';

test('getRouteMiddleware', () => {
    const noOperationIdTest = getRouteMiddleware({}, { getUser: () => {} });
    expect(noOperationIdTest).toEqual(None);

    const noHandlerTest = getRouteMiddleware({ operationId: 'getUser' }, { deleteUser: () => {} });
    expect(noHandlerTest).toEqual(None);

    const fnMap = { getUser: () => {}, checkAccess: () => {} };
    const result = getRouteMiddleware({ operationId: 'getUser' }, fnMap);
    expect(result).toEqual([catchJoiErrors, fnMap.getUser, fnMap.checkAccess]);
});
