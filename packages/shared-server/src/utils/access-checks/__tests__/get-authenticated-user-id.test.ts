import Koa from 'koa';
import { getAuthenticatedUserId } from '../get-authenticated-user-id.js';

test('getAuthenticatedUserId', () => {
    const uuid = 'test-uuid';
    const data: unknown = {
        state: {
            user: {
                sub: uuid,
            },
        },
    };
    expect(getAuthenticatedUserId(data as Koa.Context)).toEqual(uuid);
});
