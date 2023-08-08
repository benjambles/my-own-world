import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import {
    ok,
    redirectAction,
} from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { getMockData } from '../../../data/get-mock-data.js';
import { renderTemplate } from '../../../utils/render-template.js';
import config from './config.js';
import create from './create.js';
import edit from './edit.js';
import list from './list.js';

export const urlPattern = '/roster';

export default function () {
    return createResource(config)
        .operation('getRosters', async (ctx) => {
            const data = await getRosterData(ctx);
            const tpl = renderTemplate(data, list);

            return ok(tpl);
        })
        .operation('getNewCampaign', async (ctx) => {
            const data = await getRosterData(ctx);
            const tpl = renderTemplate(data, create);

            return ok(tpl);
        })
        .operation('getNewSkirmish', async (ctx) => {
            const data = await getRosterData(ctx);
            const tpl = renderTemplate(data, create);

            return ok(tpl);
        })
        .operation('getRosterById', async (ctx) => {
            const data = await getRosterData(ctx);
            const tpl = renderTemplate(data, edit);

            return ok(tpl);
        })
        .operation('postNewCampaign', async (ctx) => {
            return redirectAction(ctx.state.path.replace('new-campaign', 'someid'));
        })
        .operation('postNewSkirmish', async (ctx) => {
            return redirectAction(ctx.state.path.replace('new-skirmish', 'someid'));
        })
        .operation('updateRosterById', async (ctx) => {
            const data = await getRosterData(ctx);
            const tpl = renderTemplate(data, edit);

            return ok(tpl);
        })
        .get();
}

export type RosterData = Awaited<ReturnType<typeof getRosterData>>;
export async function getRosterData(ctx) {
    const mockData = await getMockData(ctx);
    return {
        ...mockData,
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
                    currentMission: 'Into the breach',
                },
            ],
        },
    };
}
