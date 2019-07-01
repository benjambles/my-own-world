import getErrorMessage from '../get-error-message';

test('getErrorMessage', () => {
    expect(getErrorMessage({ msg: "This hasn't got a value" })).toEqual("This hasn't got a value");

    const details = {
        message: 'Complex error',
        path: ['query, prop1'],
        other: 'props'
    };

    expect(getErrorMessage({ details })).toEqual({ message: details.message, path: details.path });
});
