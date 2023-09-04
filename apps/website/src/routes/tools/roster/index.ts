import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    ok,
    redirectAction,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { getMockData } from '../../../data/get-mock-data.js';
import siteLayout from '../../../layouts/core/site.js';
import { renderTemplate } from '../../../utils/render-template.js';
import config from './config.js';
import create from './create.js';
import edit from './edit.js';
import list from './list.js';

export default function () {
    return createResource(config)
        .operation('getRosters', async (ctx) => {
            const [pageData, rosterData] = await Promise.all([
                getMockData(ctx),
                getRosterData(),
            ]);

            const tpl = renderTemplate(pageData, siteLayout(pageData, list(rosterData)));

            return ok(tpl);
        })
        .operation('getNewCampaign', async (ctx) => {
            const pageData = await getMockData(ctx);
            const tpl = renderTemplate(pageData, siteLayout(pageData, create()));

            return ok(tpl);
        })
        .operation('getNewSkirmish', async (ctx) => {
            const pageData = await getMockData(ctx);
            const tpl = renderTemplate(pageData, siteLayout(pageData, create()));

            return ok(tpl);
        })
        .operation('getRosterById', async (ctx) => {
            const pageData = await getMockData(ctx);
            const tpl = renderTemplate(pageData, siteLayout(pageData, edit()));

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
            const tpl = renderTemplate(pageData, siteLayout(pageData, edit()));

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
