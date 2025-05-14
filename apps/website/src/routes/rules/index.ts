import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import siteLayout from '../../layouts/core/site.js';
import config from './config.js';
import quickStart from './pages/quick-start/quick-start.js';
import turnOrder from './pages/turn-order/turn-order.js';
import operatives from './pages/operatives/operatives.js';
import campaigns from './pages/campaigns/campaigns.js';
import skirmishes from './pages/skirmishes/skirmishes.js';
import rules from './pages/rules/rules.js';
import { gameNameString } from '../../helpers.js';

export default function () {
    return createResource(config)
        .operation('getRules', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Rules: ${gameNameString}` },
                siteLayout(rules()),
            );

            return ok(tpl);
        })
        .operation('getQuickStart', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Quick Start Rules: ${gameNameString}` },
                siteLayout(quickStart()),
            );

            return ok(tpl);
        })
        .operation('getTurnOrder', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Turn Order: ${gameNameString}` },
                siteLayout(turnOrder()),
            );

            return ok(tpl);
        })
        .operation('getOperatives', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Operatives: ${gameNameString}` },
                siteLayout(operatives()),
            );

            return ok(tpl);
        })
        .operation('getCampaigns', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Campaigns: ${gameNameString}` },
                siteLayout(campaigns()),
            );

            return ok(tpl);
        })
        .operation('getSkirmishes', async (ctx) => {
            const tpl = renderTemplate(
                { title: `Skirmishes: ${gameNameString}` },
                siteLayout(skirmishes()),
            );

            return ok(tpl);
        })
        .get();
}
