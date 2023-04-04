import { createMockContext } from '@shopify/jest-koa-mocks';
import createError from 'http-errors';
import * as errors from '../errors.js';

const ctx = createMockContext({ state: { env: { NODE_ENV: 'development' } } });
let throwSpy;

beforeEach(() => {
    throwSpy = jest.spyOn(ctx, 'throw');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('throwNoAccessError', function () {
    errors.throwNoAccess(ctx);
    expect(throwSpy).toHaveBeenCalledWith(401, 'Unauthorised access to endpoint');
});

test('badResponseError', function () {
    errors.throwBadResponse(ctx, 'could not load page');
    expect(throwSpy).toHaveBeenCalledWith(400, 'could not load page');
});

test('throwSafeError', function () {
    errors.throwSafeError(ctx, new Error('secret impl details'));
    expect(throwSpy).toHaveBeenCalledWith(500, 'secret impl details');

    errors.throwSafeError(ctx, createError(400, 'secret impl details'));
    expect(throwSpy).toHaveBeenCalledWith(400, 'secret impl details');
});
