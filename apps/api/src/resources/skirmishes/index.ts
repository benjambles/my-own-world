import {
    ClientApi,
    createResource,
} from '@benjambles/mow-server/dist/routing/create-resource.js';
import { getAuthenticatedUserId } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import { isAdmin } from '@benjambles/mow-server/dist/utils/access-checks/is-admin.js';
import { getObjectId } from '@benjambles/mow-server/dist/utils/db.js';
import {
    created,
    noContent,
    ok,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import createError from 'http-errors';
import { DataModel } from '../../app.js';
import config from './config.js';
import { cleanResponse } from './skirmishes.js';

export type SkirmishClientTypes = ClientApi<typeof config>;

/**
 * Routes on /skirmishes and /skirmishes/*
 */
export default function skirmishes(dataModel: DataModel) {
    const skirmishes = dataModel.getKey('skirmishes');

    return createResource(config)
        .operation('createSkirmish', async (ctx) => {
            const { body } = ctx.request;
            const userId = getAuthenticatedUserId(ctx);
            const skirmishResult = await skirmishes.create(body, userId);

            if (!skirmishResult.ok) {
                throw createError(400, 'There was an error creating the skirmish');
            }

            return created(cleanResponse(skirmishResult.value));
        })
        .operation('deleteSkirmishById', async (ctx) => {
            const { skirmishId } = ctx.request.params;
            const userId = getAuthenticatedUserId(ctx);
            const result = await skirmishes.delete(skirmishId, userId);

            if (!result.ok) {
                throw createError(400, 'There was an error whilst deleting the skirmish');
            }

            return noContent();
        })
        .operation('getSkirmishes', async (ctx) => {
            const { limit, offset, userId } = ctx.request.query;

            if (!isAdmin(ctx) && userId !== getAuthenticatedUserId(ctx)) {
                throw createError(403, 'Unable to access another users data');
            }

            const skirmishesResult = await skirmishes.get(userId, limit, offset);
            const skirmishCount = await skirmishes.count({ userId: getObjectId(userId) });

            return ok({
                count: skirmishCount,
                items: skirmishesResult.value.map(cleanResponse),
            });
        })
        .operation('getSkirmishById', async (ctx) => {
            const { skirmishId } = ctx.request.params;
            const userId = getAuthenticatedUserId(ctx);

            const skirmishesResult = await skirmishes.find(skirmishId, userId);

            if (!skirmishesResult.ok) {
                throw createError(
                    404,
                    'There was an error whilst getting the skirmish data',
                );
            }

            return ok(cleanResponse(skirmishesResult.value));
        })
        .operation('updateSkirmishById', async (ctx) => {
            const userId = getAuthenticatedUserId(ctx);
            const skirmishResult = await skirmishes.update(
                ctx.request.params.skirmishId,
                userId,
                ctx.request.body,
            );

            if (!skirmishResult.ok) {
                throw createError(400, 'There was an error updating the skirmish data');
            }

            return ok(cleanResponse(skirmishResult.value));
        })
        .get();
}
