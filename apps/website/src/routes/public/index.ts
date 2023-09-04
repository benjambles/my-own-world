import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { getMockData } from '../../data/get-mock-data.js';
import siteLayout from '../../layouts/core/site.js';
import { renderTemplate } from '../../utils/render-template.js';
import terms from '../public/terms/terms.js';
import config from './config.js';
import home from './home/home.js';

export default function () {
    return createResource(config)
        .operation('getHome', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = renderTemplate(data, siteLayout(data, home()));

            return ok(tpl);
        })
        .operation('getAccessibilityPolicy', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = renderTemplate(data, siteLayout(data, terms()));
            return ok(tpl);
        })
        .operation('getPrivacyPolicy', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = renderTemplate(data, siteLayout(data, terms()));
            return ok(tpl);
        })
        .operation('getTerms', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = renderTemplate(data, siteLayout(data, terms()));
            return ok(tpl);
        })
        .get();
}
