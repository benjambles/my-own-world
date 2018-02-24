import * as Koa from "koa";

import { send } from "../../../utils/routes";
import * as identifiers from "./identifiers";

//--- /users/:userId/identifiers ---//

/**
 *
 * @param ctx
 * @param next
 */
export async function getUserIdentifiers(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: "There was an error whilst fetching identities for the user.",
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const identityData = await identifiers.getByUserId(ctx.request.params.userId, {
            limit: ctx.request.query.count,
            offset: ctx.request.query.offset
        });

        return { parts: [{ identityData }] };
    });
}

export async function createUserIdentifier(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: "There was an error whilst adding the identifier to the user.",
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const identifierData = await identifiers.create(
            ctx.request.params.userId,
            ctx.request.body
        );
        return { parts: [identifierData] };
    });
}

//--- /users/:userId/identifiers/:identifierId --/

/**
 *
 * @param ctx
 * @param next
 */
export async function deleteUserIdentifier(ctx: Koa.Context, next: Function): Promise<void> {
    const defaultError = {
        message: "There was an error whilst deleting the users identity.",
        status: 400
    };
    await next();
    await send(ctx, defaultError, async function() {
        const isDeleted = await identifiers.remove(ctx.request.params.identifierId);
        return { parts: [isDeleted] };
    });
}
