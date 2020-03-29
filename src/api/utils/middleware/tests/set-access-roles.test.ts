import setAccessRoles from '../set-access-roles';
import * as Koa from 'koa';

test('setAccessRoles', () => {
    const roles = ['role:user', 'role:owner'];
    const ctx = {
        state: {
            accessRoles: '',
        },
    };

    setAccessRoles(roles)((ctx as unknown) as Koa.Context, async () => {});

    expect(ctx.state.accessRoles).toEqual(roles);
});
