import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import siteLayout from '../../layouts/core/site.js';
import account from './account/account.js';
import config from './config.js';
import join from './join/join.js';
import { gameNameString } from '../../helpers.js';

export default function () {
    return createResource(config)
        .operation('getAccount', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Your Information: ${gameNameString}` },
                siteLayout(account(), true),
            );
            return ok(tpl);
        })
        .operation('getLogIn', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Welcome Citizen: ${gameNameString}` },
                siteLayout(join()),
            );
            return ok(tpl);
        })
        .operation('getLogOut', async (ctx) => {
            ctx.cookies.set('mow-auth');
            ctx.cookies.set('mow-fingerprint');
            ctx.cookies.set('mow-refreshtoken');

            const tpl = renderTemplate(
                { title: `Welcome Citizen: ${gameNameString}` },
                siteLayout(join()),
            );

            return ok(tpl);
        })
        .operation('getSignUp', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Welcome Citizen: ${gameNameString}` },
                siteLayout(join()),
            );
            return ok(tpl);
        })
        .get();
}
