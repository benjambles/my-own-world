import { swaggerToJoiType } from '../swagger-to-joi-type.js';

test('swaggerToJoiType', () => {
    const tests = [
        ['integer', 'number'],
        ['int64', 'integer'],
        ['minLength', 'min'],
        ['maxLength', 'max'],
        ['minimum', 'min'],
        ['maximum', 'max'],
        ['string', 'string'],
    ];

    tests.forEach(([value, result]) => {
        expect(swaggerToJoiType(value)).toEqual(result);
    });
});
