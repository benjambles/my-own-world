/**
 *
 * @param token
 */
type ContextWithUserState = {
    state?: {
        user?: {
            sub: string;
            isAdmin: boolean;
        };
    };
};
export function isAdmin(ctx: ContextWithUserState): boolean {
    return ctx.state.user?.isAdmin === true; // TODO: define admin users
}
