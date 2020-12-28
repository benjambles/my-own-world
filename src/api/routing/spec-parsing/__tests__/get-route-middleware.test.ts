import { some } from 'ts-option';
import { catchJoiErrors } from '../../../utils/middleware/catch-joi-errors';
import { getRouteMiddleware } from '../get-route-middleware';

test('getRouteMiddleware', () => {
    const dummyMiddleware = async (ctx, next) => {
        await next();
    };

    const noOperationIdTest = getRouteMiddleware({}, { getUser: dummyMiddleware }, async () => {});
    expect(noOperationIdTest.isEmpty).toEqual(true);

    const noHandlerTest = getRouteMiddleware(
        { operationId: 'getUser' },
        { deleteUser: dummyMiddleware },
        async () => {},
    );
    expect(noHandlerTest.isEmpty).toEqual(true);

    const fnMap = {
        getUser: dummyMiddleware,
        checkAccess: dummyMiddleware,
    };
    const result = getRouteMiddleware({ operationId: 'getUser' }, fnMap, async () => {});
    expect(result).toEqual(some([catchJoiErrors, fnMap.getUser, fnMap.checkAccess]));
});
