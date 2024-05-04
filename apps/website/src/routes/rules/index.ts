import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import siteLayout from '../../layouts/core/site.js';
import config from './config.js';
import quickStart from './pages/quick-start/quick-start.js';
import turnOrder from './pages/turn-order/turn-order.js';

export default function () {
    return createResource(config)
        .operation('getQuickStart', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Quick Start Rules: Khora' },
                siteLayout(quickStart()),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getTurnOrder', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Turn Order: Khora' },
                siteLayout(turnOrder()),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .get();
}
