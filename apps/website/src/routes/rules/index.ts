import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { getMockData } from '../../data/get-mock-data.js';
import siteLayout from '../../layouts/core/site.js';
import config from './config.js';
import quickStart from './quick-start/quick-start.js';

export default function () {
    return createResource(config)
        .operation('getQuickStart', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = renderTemplate(data, siteLayout(data, quickStart()));

            return ok(tpl);
        })
        .get();
}
