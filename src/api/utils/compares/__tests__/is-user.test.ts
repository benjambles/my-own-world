import { createMockContext } from '@shopify/jest-koa-mocks';
import { isUser } from '../is-user';

test('isUser', () => {
    expect(isUser(createMockContext({ state: { user: true } }))).toEqual(true);
    expect(isUser(createMockContext({ state: {} }))).toEqual(false);
    expect(isUser(createMockContext({}))).toEqual(false);
});
