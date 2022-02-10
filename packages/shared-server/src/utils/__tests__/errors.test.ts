import { createMockContext } from '@shopify/jest-koa-mocks';
import { badResponseError, throwNoAccessError } from '../errors.js';

const ctx = createMockContext();
const throwSpy = jest.spyOn(ctx, 'throw');

beforeEach(() => {
    throwSpy.mockReset();
});

test('throwNoAccessError', () => {
    throwNoAccessError(ctx)();
    expect(throwSpy).toHaveBeenCalledWith(401, 'Unauthorised access to endpoint');
});

test('badResponseError', () => {
    badResponseError(ctx)('could not load page');
    expect(throwSpy).toHaveBeenCalledWith(400, 'could not load page');
});
