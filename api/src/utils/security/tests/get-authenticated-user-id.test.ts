import * as Koa from 'koa';
import getAuthenticatedUserId from '../get-authenticated-user-id';

test('getAuthenticatedUserId', () => {
    const uuid = 'test-uuid';
    const data: unknown = {
        state: {
            user: {
                uuid,
            },
        },
    };
    expect(getAuthenticatedUserId(data as Koa.Context)).toEqual(uuid);
});
