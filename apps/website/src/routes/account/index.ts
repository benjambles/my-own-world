import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { getMockData } from '../../data/get-mock-data.js';
import { iterateTemplateParts } from '../../utils/render-template.js';
import terms from '../public/terms/terms.js';
import config from './config.js';

export default function () {
    return createResource(config)
        .operation('getAccount', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = iterateTemplateParts(data, terms);
            return ok(tpl);
        })
        .operation('getSignUp', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = iterateTemplateParts(data, terms);
            return ok(tpl);
        })
        .get();
}
