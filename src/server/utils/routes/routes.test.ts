import 'jest';
import * as Koa from 'koa';
import * as routes from './index';

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

test('baseAccessMap', () => {
    const tests = [[true, 'role:admin'], [true, 'role:user'], [false, '']];
    const ctx = { state: { user: { userData: true }, userData: true } };
    const accessMap = routes.baseAccessMap(ctx as Koa.Context);

    tests.forEach(([expectedResult, role]) => {
        expect(accessMap(role)).toEqual(expectedResult);
    });
});

test('bindCheckAccess');
test('bindOptions');
test('send');
test('generateRoute');

test('partsResponse', () => {
    const expectedResult = {
        parts: {
            body: {
                data: 1
            },
            meta: {
                data: 2
            }
        }
    };
    const { body, meta } = expectedResult.parts;
    expect(routes.partsResponse(body, meta)).toEqual(expectedResult);
});

test('dataResponse', () => {
    const expectedResult = {
        data: [1, 2, 3, 4, 5]
    };
    expect(routes.dataResponse(expectedResult.data)).toEqual(expectedResult);
});
