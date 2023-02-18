import * as responses from '../responses.js';

test('created', function () {
    expect(responses.created({ id: '123' })).toEqual({
        status: 201,
        body: { id: '123' },
    });
});

test('ok', function () {
    expect(responses.ok({ id: '123' })).toEqual({
        status: 200,
        body: { id: '123' },
    });
});

test('noResponse', function () {
    expect(responses.noResponse()).toEqual({
        status: 204,
    });
});
