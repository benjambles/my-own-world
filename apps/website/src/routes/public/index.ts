import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import siteLayout from '../../layouts/core/site.js';
import config from './config.js';
import home from './home/home.js';
import terms from './terms/terms.js';

export default function () {
    return createResource(config)
        .operation('getAccessibilityPolicy', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Accessibility Policy: Khora' },
                siteLayout(terms()),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getHome', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Welcome to the universe: Khora' },
                siteLayout(home()),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getPrivacyPolicy', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Privacy Policy: Khora' },
                siteLayout(terms()),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .operation('getTerms', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Terms of Use: Khora' },
                siteLayout(terms()),
                ctx.state.env.NODE_ENV,
            );

            return ok(tpl);
        })
        .get();
}
