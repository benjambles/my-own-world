import * as Koa from 'koa';
import * as routes from '../index';

test('getAuthenticateUserId', () => {
    const uuid = 'test-uuid';
    const data = {
        state: {
            user: {
                uuid
            }
        }
    };
    expect(routes.getAuthenticatedUserId(data as Koa.Context)).toEqual(uuid);
});

test('getAccessMap', () => {
    const tests = [[true, 'role:admin'], [true, 'role:user'], [false, '']];
    const ctx = { state: { user: { userData: true }, userData: true } };
    const accessMap = routes.getAccessMap()(ctx as Koa.Context);

    tests.forEach(([expectedResult, role]) => {
        expect(accessMap(role)).toEqual(expectedResult);
    });
});

test.todo('bindCheckAccess');
test.todo('bindOptions');
test.todo('send');
test.todo('generateRoute');
