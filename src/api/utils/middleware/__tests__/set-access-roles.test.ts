import { createMockContext } from '@shopify/jest-koa-mocks';
import { setAccessRoles } from '../set-access-roles';

test('setAccessRoles', () => {
    const roles = ['role:user', 'role:owner'];
    const ctx = createMockContext();

    ctx.state = {
        accessRoles: '',
    };

    setAccessRoles(roles)(ctx, async () => {});

    expect(ctx.state.accessRoles).toEqual(roles);
});
