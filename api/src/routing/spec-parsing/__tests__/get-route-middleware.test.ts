import { catchJoiErrors } from '../../../utils/middleware/catch-joi-errors';
import { getRouteMiddleware } from '../get-route-middleware';
import { some } from 'fp-ts/lib/Option';

test('getRouteMiddleware', () => {
    const next = async () => {};

    const noOperationIdTest = getRouteMiddleware({}, { getUser: async ({}, next) => {} });
    expect(noOperationIdTest.isNone()).toEqual(true);

    const noHandlerTest = getRouteMiddleware(
        { operationId: 'getUser' },
        { deleteUser: async ({}, next) => {} }
    );
    expect(noHandlerTest.isNone()).toEqual(true);

    const fnMap = { getUser: async ({}, next) => {}, checkAccess: async ({}, next) => {} };
    const result = getRouteMiddleware({ operationId: 'getUser' }, fnMap);
    expect(result).toEqual(some([catchJoiErrors, fnMap.getUser, fnMap.checkAccess]));
});
