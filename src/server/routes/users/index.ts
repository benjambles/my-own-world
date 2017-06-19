const config = require('./config.json');
import buildResponse = require("../../lib/response");
import response = require("../../lib/response");
import User = require("../../models/users");
import * as Koa from "koa";

import responseStatuses from '../../lib/constants';

export async function userOptions(ctx: Koa.Context): Promise<void> {
    response.sendOptions(ctx, Object.assign({}, config.paths['/users']));
}

export async function getUsers(ctx: Koa.Context): Promise<void> {
    let users = await User.getUsers(1, 1);

    response.sendAPIResponse(ctx, { message: responseStatuses.success }, { users });
}

export async function createUser(ctx: Koa.Context): Promise<void> {
    let user = await User.createUser(ctx.request.body);

    response.sendAPIResponse(ctx, { message: responseStatuses.success }, { user });
}

export async function getUserById(ctx: Koa.Context): Promise<void> {
    let user = await User.getUserById(ctx.params.id);

    response.sendAPIResponse(ctx, { message: responseStatuses.success }, user);
}

export async function updateUser(ctx: Koa.Context): Promise<void> {
    let user = await User.getUserById(ctx.params.id);
    let updatedUser = await user.update(ctx.request.body);

    response.sendAPIResponse(ctx, { message: responseStatuses.success }, user);
}

export async function deleteUserById(ctx: Koa.Context): Promise<void> {
    let user = await User.getUserById(ctx.params.id);
    let deletedUser = await user.delete();

    response.sendAPIResponse(ctx, { message: responseStatuses.success }, {});
}

export async function findUserOptions(ctx: Koa.Context): Promise<void> {
    response.sendOptions(ctx, Object.assign({}, config.paths['/users/:id']));
}