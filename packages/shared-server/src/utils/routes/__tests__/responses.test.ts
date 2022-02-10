import { dataResponse, partsResponse } from '../responses.js';

test('partsResponse', () => {
    const expectedResult = {
        body: {
            data: 1,
        },
        meta: {
            data: 2,
        },
    };
    const { body, meta } = expectedResult;
    expect(partsResponse(body, meta)).toEqual(expectedResult);
    expect(partsResponse()).toEqual({ parts: { body: {}, meta: {} } });
});

test('dataResponse', () => {
    const expectedResult = {
        data: [1, 2, 3, 4, 5],
    };
    expect(dataResponse(expectedResult.data)).toEqual(expectedResult);
});
