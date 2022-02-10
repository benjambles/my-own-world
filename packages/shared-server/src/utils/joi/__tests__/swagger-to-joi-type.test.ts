import { swaggerToJoiType } from '../swagger-to-joi-type.js';

test('swaggerToJoiType', () => {
    const tests = [
        ['string', 'token'],
        ['number', 'integer'],
        ['integer', 'int64'],
        ['string', 'string'],
        ['number', 'number'],
        ['boolean', 'boolean'],
    ];

    tests.forEach(([result, value]) => {
        expect(swaggerToJoiType(value)).toEqual(result);
    });
});
