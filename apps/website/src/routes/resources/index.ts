import { createResource } from '@benjambles/mow-server/dist/routing/create-resource.js';
import { ok } from '@benjambles/mow-server/dist/utils/routes/responses.js';
import { renderTemplate } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import siteLayout from '../../layouts/core/site.js';
import codex from './codex/codex.js';
import config from './config.js';
import downloads from './downloads/downloads.js';
import tools from './tools/tools.js';

export default function () {
    return createResource(config)
        .operation('getCodex', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'NPC Codex: Khora' },
                siteLayout(codex()),
                ctx.state.env.NODE_ENV,
            );
            return ok(tpl);
        })
        .operation('getDownloads', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Downloads: Khora' },
                siteLayout(downloads()),
                ctx.state.env.NODE_ENV,
            );
            return ok(tpl);
        })
        .operation('getTools', async (ctx) => {
            const tpl = renderTemplate(
                { title: 'Game Tools: Khora' },
                siteLayout(tools()),
                ctx.state.env.NODE_ENV,
            );
            return ok(tpl);
        })
        .get();
}
