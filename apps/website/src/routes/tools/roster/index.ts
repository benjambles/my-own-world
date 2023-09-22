import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { getAuthenticatedUserId } from '@benjambles/mow-server/dist/utils/access-checks/get-authenticated-user-id.js';
import {
    ok,
    redirectAction,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { getJwtFromCookie } from '@benjambles/mow-server/dist/utils/security/jwt.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { apiHelpers } from '../../../app.js';
import siteLayout from '../../../layouts/core/site.js';
import config, { paths } from './config.js';
import create from './pages/create.js';
import edit from './pages/edit.js';
import list from './pages/list.js';

export default function () {
    return createResource(config)
        .operation('getNewCampaign', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Create A Campaign Squad: Khora' },
                siteLayout(create(), true),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getNewSkirmish', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Create A Skirmish Squad: Khora' },
                siteLayout(create(), true),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getRosterById', async (ctx) => {
            const rosterData = await apiHelpers.games.getGameById(
                {
                    params: { gameId: ctx.request.params.rosterId },
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            const tpl = renderTemplate(
                { title: 'Update Squad: Khora' },
                siteLayout(edit(rosterData), true),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getRosters', async (ctx) => {
            const { limit = 30, offset = 0 } = ctx.request.query;
            const { count, games } = await apiHelpers.games.getGames(
                {
                    query: { userId: getAuthenticatedUserId(ctx), limit, offset },
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            const tpl = renderTemplate(
                { title: 'Your Squads: Khora' },
                siteLayout(list({ count, games, limit, offset }), true),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('postNewCampaign', async (ctx) => {
            const rosterData = await apiHelpers.games.createGame(
                {
                    body: ctx.request.body,
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            return redirectAction(paths.rosterById.replace(':rosterId', rosterData._id));
        })
        .operation('postNewSkirmish', async (ctx) => {
            const rosterData = await apiHelpers.games.createGame(
                {
                    body: ctx.request.body,
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            return redirectAction(paths.rosterById.replace(':rosterId', rosterData._id));
        })
        .operation('updateRosterById', async (ctx) => {
            const rosterData = await apiHelpers.games.updateGameById(
                {
                    params: { gameId: ctx.request.params.rosterId },
                    body: ctx.request.body,
                },
                getJwtFromCookie(ctx, 'mow-auth'),
            );

            const tpl = renderTemplate(
                { title: 'Update Squad: Khora' },
                siteLayout(edit(rosterData), true),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .get();
}

export type Game = {
    _id: string;
    createdOn: string;
    description: string;
    game: {
        name: string;
        version: string;
    };
    name: string;
    points: number;
    type: string;
    userId: string;
};
