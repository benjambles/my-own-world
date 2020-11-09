import { some } from 'ts-option';
import { catchJoiErrors } from '../../../utils/middleware/catch-joi-errors';
import { getRouteMiddleware } from '../get-route-middleware';

test('getRouteMiddleware', () => {
    const dummyMiddleware = async (ctx, next) => {
        await next();
    };

    const noOperationIdTest = getRouteMiddleware({}, { getUser: dummyMiddleware });
    expect(noOperationIdTest.isEmpty).toEqual(true);

    const noHandlerTest = getRouteMiddleware(
        { operationId: 'getUser' },
        { deleteUser: dummyMiddleware },
    );
    expect(noHandlerTest.isEmpty).toEqual(true);

    const fnMap = {
        getUser: dummyMiddleware,
        checkAccess: dummyMiddleware,
    };
    const result = getRouteMiddleware({ operationId: 'getUser' }, fnMap);
    expect(result).toEqual(some([catchJoiErrors, fnMap.getUser, fnMap.checkAccess]));
});
