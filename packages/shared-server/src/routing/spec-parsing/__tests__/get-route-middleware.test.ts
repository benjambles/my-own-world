import { some } from 'ts-option';
import { catchJoiErrors } from '../../../koa/middleware/catch-joi-errors.js';
import { getRouteMiddleware } from '../get-route-middleware.js';

test('getRouteMiddleware', () => {
    async function _getUser() {}
    async function _deleteUser() {}

    const noOperationIdTest = getRouteMiddleware(
        {},
        {
            getUser: () => _getUser,
        },
        {},
    );
    expect(noOperationIdTest.isEmpty).toEqual(true);

    const noHandlerTest = getRouteMiddleware(
        { operationId: 'getUser' },
        {
            deleteUser: () => _deleteUser,
        },
        {},
    );
    expect(noHandlerTest.isEmpty).toEqual(true);

    const fnMap = {
        getUser: () => _getUser,
        checkAccess: async () => {},
    };
    const result = getRouteMiddleware({ operationId: 'getUser' }, fnMap, {});
    expect(result).toEqual(some([catchJoiErrors, _getUser, fnMap.checkAccess]));
});
