import createError from 'http-errors';
import Koa from 'koa';
import { badResponseError, throwNoAccessError } from '../errors';

const ctx: unknown = {
    throw: (statusCode, msg) => {
        throw createError(statusCode, msg);
    },
};

test('throwNoAccessError', () => {
    expect(() => throwNoAccessError(ctx as Koa.Context)()).toThrow();
});

test('badResponseError', () => {
    expect(() => badResponseError(ctx as Koa.Context)('could not load page')).toThrow();
});
