import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    ok,
    redirectAction,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { getMockData } from '../../../data/get-mock-data.js';
import siteLayout from '../../../layouts/core/site.js';
import config from './config.js';
import create from './create.js';
import edit from './edit.js';
import list from './list.js';

export default function () {
    return createResource(config)
        .operation('getNewCampaign', async (ctx) => {
            const pageData = await getMockData(ctx);
            const gameData = await getRosterData();
            const tpl = renderTemplate(
                pageData,
                siteLayout(pageData, create({ game: gameData.content.games[0] })),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getNewSkirmish', async (ctx) => {
            const pageData = await getMockData(ctx);

            const gameData = await getRosterData();
            const tpl = renderTemplate(
                pageData,
                siteLayout(pageData, create({ game: gameData.content.games[0] })),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getRosterById', async (ctx) => {
            const pageData = await getMockData(ctx);
            const tpl = renderTemplate(
                pageData,
                siteLayout(pageData, edit()),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getRosters', async (ctx) => {
            const [pageData, rosterData] = await Promise.all([
                getMockData(ctx),
                getRosterData(),
            ]);

            const tpl = renderTemplate(
                pageData,
                siteLayout(pageData, list(rosterData)),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('postNewCampaign', async (ctx) => {
            return redirectAction(ctx.state.path.replace('new-campaign', 'someid'));
        })
        .operation('postNewSkirmish', async (ctx) => {
            return redirectAction(ctx.state.path.replace('new-skirmish', 'someid'));
        })
        .operation('updateRosterById', async (ctx) => {
            const pageData = await getMockData(ctx);
            const tpl = renderTemplate(
                pageData,
                siteLayout(pageData, edit()),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .get();
}

export type RosterData = Awaited<ReturnType<typeof getRosterData>>;
export async function getRosterData() {
    return {
        content: {
            title: 'Crews',
            games: [
                {
                    id: 'game-1',
                    name: 'Game name 1',
                    description: '',
                    createdOn: new Date(),
                    type: 'skirmish',
                    difficulty: 'normal',
                    credits: 200,
                },
                {
                    id: 'game-2',
                    name: 'Game name 2',
                    description: '',
                    createdOn: new Date(),
                    type: 'campaign',
                    credits: 2000,
                    difficulty: 'normal',
                    campaignName: 'Into the breach',
                },
            ],
        },
    };
}

export type Game = SkirmishGame | CampaignGame;

type SkirmishGame = {
    id: string;
    name: string;
    description: string;
    createdOn: Date;
    type: 'skirmish';
    credits: number;
    difficulty: 'normal' | 'easy' | 'hard';
};

type CampaignGame = {
    id: string;
    name: string;
    description: string;
    createdOn: Date;
    type: 'campaign';
    credits: number;
    difficulty: 'normal' | 'easy' | 'hard';
    campaignName: string;
};
