import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { getMockData } from '../../data/get-mock-data.js';
import siteLayout from '../../layouts/core/site.js';
import { renderTemplate } from '../../utils/render-template.js';
import account from './account/account.js';
import config from './config.js';
import join from './join/join.js';

export default function () {
    return createResource(config)
        .operation('getAccount', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = renderTemplate(data, siteLayout(data, account()));
            return ok(tpl);
        })
        .operation('getSignUp', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = renderTemplate(data, siteLayout(data, join()));
            return ok(tpl);
        })
        .operation('getLogIn', async (ctx) => {
            const data = await getMockData(ctx);
            const tpl = renderTemplate(data, siteLayout(data, join()));
            return ok(tpl);
        })
        .operation('getLogOut', async (ctx) => {
            const data = await getMockData(ctx);
            ctx.cookies.set('mow-fingerprint');
            ctx.cookies.set('mow-refreshtoken');
            ctx.cookies.set('mow-auth');

            const tpl = renderTemplate(data, siteLayout(data, join()));

            return ok(tpl);
        })
        .get();
}
