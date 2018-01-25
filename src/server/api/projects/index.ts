import * as Koa from "koa";

import { isAdmin, isTrue } from "../../utils";
import { bindOptions, send } from "../../utils/routes";
import * as Projects from "./model/projects";

const config = require("./config.json");

export const sendOptions = bindOptions(config);

//--- /projects ---//

/**
 * Get projects, optionally filtered by parameters
 * @route [GET] /projects
 * @param ctx A Koa context object
 */
export async function getProjects(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst fetching projects.", status: 400 };
    await next();
    await send(ctx, error, async function() {
        const projects = await Projects.getMany(ctx.request.query.count, ctx.request.query.offset);

        return { parts: [projects] };
    });
}

/**
 * Create a new project
 * @route [POST] /projects
 * @param ctx A Koa context object
 */
export async function createProject(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst saving the project", status: 400 };
    await next();
    await send(ctx, error, async function() {
        let project = await Projects.create(ctx.request.body);

        return { parts: [project] };
    });
}

//--- /projects/:id ---//

/**
 * Get a project and return it's data object
 * @route [GET] /projects/:id
 * @param ctx A Koa context object
 */
export async function getProjectById(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst fetching the project.", status: 400 };
    await next();
    await send(ctx, error, async function() {
        const project = await Projects.get(ctx.request.params.id);
        return { parts: [project] };
    });
}

/**
 * Update a project and return the updated data
 * @route [PUT] /projects/:id
 * @param ctx A Koa context object
 */
export async function updateProject(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst updating the project.", status: 400 };
    await next();
    await send(ctx, error, async function() {
        const project = await Projects.update(ctx.request.params.id, ctx.request.body);

        return { parts: [project] };
    });
}

/**
 * Mark a project as deleted
 * @route [DELETE] /projects/:id
 * @param ctx
 */
export async function deleteProjectById(ctx: Koa.Context, next: Function): Promise<void> {
    const error = { message: "There was an error whilst deleting the project.", status: 400 };
    await next();
    await send(ctx, error, async function() {
        const project = await Projects.remove(ctx.request.params.id);

        return { parts: [project] };
    });
}

//--- Utility functions for handling permissions and other non-model related functionality ---//

/**
 * Throwns an error if the projects roles and access rights don't match requirements
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
                        return isOwnerUser(ctx);
                    default:
                        return true; // role unrelated to these routes, assume access
                }
            })
            .every(isTrue);

        if (!access) {
            ctx.throw(401, "Unauthorised access to endpoint");
        }
    }
}

/**
 * Checks to see if the project making the request is the target of the request
 * @param ctx A Koa context with JWT state provided
 */
function isOwnerUser(ctx: Koa.Context): boolean {
    if (!ctx.request.params.id) return true;
    return (
        ctx.state.project &&
        ctx.state.project.creator &&
        ctx.state.project.creator === ctx.state.uuid
    );
}
