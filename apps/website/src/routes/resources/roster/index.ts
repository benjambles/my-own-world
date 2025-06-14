import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { getAuthenticatedUserId } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import { ok, seeOther } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { getJwtFromCookie } from '@benjambles/mow-server/dist/utils/security/jwt.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { apiHelpers } from '../../../app.js';
import siteLayout from '../../../layouts/core/site.js';
import config, { rosterPaths } from './config.js';
import create from './pages/create.js';
import edit from './pages/edit.js';
import list from './pages/list.js';
import { gameNameString } from '../../../helpers.js';

export default function () {
    return createResource(config)
        .operation('getNewCampaign', async (ctx) => {
            const {
                items: [{ _id: gameId }],
            } = await apiHelpers.games.getGames(
                { query: { limit: 1, offset: 0, gameName: 'khora' } },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            const tpl = renderTemplate(
                { title: `Create A Campaign Squad: ${gameNameString}` },
                siteLayout(create({ gameId }), true),
            );

            return ok(tpl);
        })
        .operation('getNewSkirmish', async (ctx) => {
            const {
                items: [{ _id: gameId }],
            } = await apiHelpers.games.getGames(
                { query: { limit: 1, offset: 0, gameName: 'khora' } },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            const tpl = renderTemplate(
                { title: `Create A Skirmish Squad: ${gameNameString}` },
                siteLayout(create({ gameId }), true),
            );

            return ok(tpl);
        })
        .operation('getRosterById', async (ctx) => {
            const rosterData = await apiHelpers.skirmishes.getSkirmishById(
                {
                    params: { skirmishId: ctx.request.params.rosterId },
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            const tpl = renderTemplate(
                { title: `Update Squad: ${gameNameString}` },
                siteLayout(edit(rosterData), true),
            );

            return ok(tpl);
        })
        .operation('getRosters', async (ctx) => {
            const { limit = 30, offset = 0 } = ctx.request.query;
            const accessToken = getJwtFromCookie(ctx, 'mow-auth');

            const [
                { count, items },
                {
                    items: [{ _id: gameId }],
                },
            ] = await Promise.all([
                apiHelpers.skirmishes.getSkirmishes(
                    { query: { limit, offset, userId: getAuthenticatedUserId(ctx) } },
                    accessToken,
                ),
                apiHelpers.games.getGames(
                    { query: { limit: 1, offset: 0, gameName: 'khora' } },
                    accessToken,
                ),
            ]);

            const tpl = renderTemplate(
                { title: `Your Squads: ${gameNameString}` },
                siteLayout(list({ count, items, limit, offset, gameId }), true),
            );

            return ok(tpl);
        })
        .operation('postNewCampaign', async (ctx) => {
            const rosterData = await apiHelpers.skirmishes.createSkirmish(
                {
                    body: ctx.request.body,
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            return seeOther(rosterPaths.rosterById.replace(':rosterId', rosterData._id));
        })
        .operation('postNewSkirmish', async (ctx) => {
            const rosterData = await apiHelpers.skirmishes.createSkirmish(
                {
                    body: ctx.request.body,
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            return seeOther(rosterPaths.rosterById.replace(':rosterId', rosterData._id));
        })
        .operation('updateRosterById', async (ctx) => {
            const rosterData = await apiHelpers.skirmishes.updateSkirmishById(
                {
                    params: { skirmishId: ctx.request.params.rosterId },
                    body: ctx.request.body,
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            const tpl = renderTemplate(
                { title: `Update Squad: ${gameNameString}` },
                siteLayout(edit(rosterData), true),
            );

            return ok(tpl);
        })
        .get();
}
