import { createMockContext } from '@shopify/jest-koa-mocks';
import { getAccessMap } from '../get-access-map.js';

test('getAccessMap', () => {
    const tests: [boolean, string][] = [
        [true, 'role:admin'],
        [true, 'role:user'],
        [false, 'role:invalid'],
    ];

    const ctx = createMockContext();
    ctx.state = { user: { userData: true }, userData: true };

    const accessMap = getAccessMap()(ctx);

    tests.forEach(([expectedResult, role]) => {
        expect(accessMap(role)).toEqual(expectedResult);
    });
});
