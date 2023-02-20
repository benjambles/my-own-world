import { createMockContext } from '@shopify/jest-koa-mocks';
import * as errors from '../errors.js';

const ctx = createMockContext({ state: { env: { NODE_ENV: 'development' } } });
const prodCtx = createMockContext({ state: { env: { NODE_ENV: 'production' } } });
let throwSpy;
let prodThrowSpy;

beforeEach(() => {
    prodThrowSpy = jest.spyOn(prodCtx, 'throw');
    throwSpy = jest.spyOn(ctx, 'throw');
});

afterEach(() => {
    jest.resetAllMocks();
});

test('throwNoAccessError', function () {
    errors.throwNoAccessError(ctx)();
    expect(throwSpy).toHaveBeenCalledWith(401, 'Unauthorised access to endpoint');
});

test('badResponseError', function () {
    errors.badResponseError(ctx)('could not load page');
    expect(throwSpy).toHaveBeenCalledWith(400, 'could not load page');
});

test('throwSafeError', function () {
    errors.throwSafeError(prodCtx, { message: 'secret impl details' }, 'it broke!');
    expect(prodThrowSpy).toHaveBeenCalledWith(400, 'it broke!');

    errors.throwSafeError(
        prodCtx,
        { message: 'secret impl details', status: 500 },
        'it broke!',
    );
    expect(prodThrowSpy).toHaveBeenCalledWith(400, 'it broke!');

    errors.throwSafeError(
        prodCtx,
        { message: 'secret impl details' },
        { message: 'it broke!', status: 500 },
    );
    expect(prodThrowSpy).toHaveBeenCalledWith(400, 'it broke!');

    errors.throwSafeError(ctx, { message: 'secret impl details' }, 'it broke!');
    expect(prodThrowSpy).toHaveBeenCalledWith(400, 'secret impl details');

    errors.throwSafeError(
        ctx,
        { message: 'secret impl details', status: 500 },
        'it broke!',
    );
    expect(prodThrowSpy).toHaveBeenCalledWith(500, 'secret impl details');
});
