import * as Koa from 'koa';
import getAccessMap from '../get-access-map';

test('getAccessMap', () => {
    const tests = [
        [true, 'role:admin'],
        [true, 'role:user'],
        [false, ''],
    ];
    const ctx = { state: { user: { userData: true }, userData: true } };
    const accessMap = getAccessMap()(ctx as Koa.Context);

    tests.forEach(([expectedResult, role]) => {
        expect(accessMap(role)).toEqual(expectedResult);
    });
});
