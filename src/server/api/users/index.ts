import * as Koa from "koa";

import { isAdmin, isTrue } from "../../utils";
import { bindOptions, send } from "../../utils/routes";
import * as users from "./users";

const config = require("./config.json");

export const sendOptions = bindOptions(config);

//--- /users ---//

/**
 * Get users, optionally filtered by parameters
 * @route [GET] /users
 * @param ctx A Koa context object
 */
export async function getUsers(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst fetching users.", status: 400 };
    await next();
    await send(ctx, error, async function() {
        let usersData = await users.get({
            limit: ctx.request.query.count,
            offset: ctx.request.query.offset
        });

        return { parts: [{ usersData }] };
    });
}

/**
 * Create a new user
 * @route [POST] /users
 * @param ctx A Koa context object
 */
export async function createUser(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst saving the user", status: 400 };
    await next();
    await send(ctx, error, async function() {
        let userData = await users.create(ctx.request.body);

        return { parts: [userData] };
    });
}

//--- /users/:id ---//

/**
 * Get a user and return it's data object
 * @route [GET] /users/:id
 * @param ctx A Koa context object
 */
export async function getUserById(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst fetching the user.", status: 400 };
    await next();
    await send(ctx, error, async function() {
        let userData = await users.getOne(ctx.request.params.id);

        return { parts: [userData] };
    });
}

/**
 * Update a user and return the updated data
 * @route [PUT] /users/:id
 * @param ctx A Koa context object
 */
export async function updateUser(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst updating the user.", status: 400 };
    await next();
    await send(ctx, error, async function() {
        let userUpdated = await users.update(ctx.request.body);

        return { parts: [userUpdated] };
    });
}

/**
 * Mark a user as deleted
 * @route [DELETE] /users/:id
 * @param ctx
 */
export async function deleteUserById(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst deleting the user.", status: 400 };
    await next();
    await send(ctx, error, async function() {
        // Check that the account is either the owner of the account, or an admin
        let userDeleted = await users.remove(ctx.request.params.id);

        return { parts: [userDeleted] };
    });
}

//--- /users/authenticate ---//

/**
 * fetch related user and if found test their password
 * @route [POST] /users/authenticate
 * @param ctx A Koa context object
 */

export async function authenticateUser(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst authenticating the user.", status: 400 };
    await next();

    await send(ctx, error, async function() {
        const { email, password } = ctx.request.body;
        let userData = await users.getByEmail(email);
        let isValid = await users.validatePassword(password, userData.password);
        let token = await users.getToken(userData);

        return { parts: [{ token, user: userData }] };
    });
}

//--- Utility functions for handling permissions and other non-model related functionality ---//

/**
 * Throwns an error if the users roles and access rights don't match requirements
 * @param ctx Koa context
 * @param next The next middleware to run
 */
export async function checkAccess(ctx: Koa.Context, next: Function): Promise<void> {
    const roles = ctx.state.accessRoles || [];

    if (roles.length) {
        let access: boolean = roles
            .map(role => {
                switch (role) {
                    case "role:admin":
                        return isAdmin(ctx.state);
                    case "role:owner":
                        return isCurrentUser(ctx);
                    default:
                        return false; // role unrelated to these routes, assume no access
                }
            })
            .some(isTrue);

        if (!access) {
            ctx.throw(401, "Unauthorised access to endpoint");
        }
    }
}

/**
 * Checks to see if the user making the request is the target of the request
 * @param ctx A Koa context with JWT state provided
 */
function isCurrentUser(ctx: Koa.Context): boolean {
    if (!ctx.request.params.id) return true;
    return ctx.state.user && ctx.state.user.uuid && ctx.state.user.uuid === ctx.request.params.id;
}
