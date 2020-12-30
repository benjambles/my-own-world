import { some } from 'ts-option';
import { catchJoiErrors } from '../../../utils/middleware/catch-joi-errors';
import { getRouteMiddleware } from '../get-route-middleware';

test('getRouteMiddleware', () => {
    async function _getUser() {}
    async function _deleteUser() {}

    const noOperationIdTest = getRouteMiddleware(
        {},
        {
            getUser: () => _getUser,
        },
        async () => {},
    );
    expect(noOperationIdTest.isEmpty).toEqual(true);

    const noHandlerTest = getRouteMiddleware(
        { operationId: 'getUser' },
        {
            deleteUser: () => _deleteUser,
        },
        async () => {},
    );
    expect(noHandlerTest.isEmpty).toEqual(true);

    const fnMap = {
        getUser: () => _getUser,
        checkAccess: async () => {},
    };
    const result = getRouteMiddleware({ operationId: 'getUser' }, fnMap, async () => {});
    expect(result).toEqual(some([catchJoiErrors, _getUser, fnMap.checkAccess]));
});
