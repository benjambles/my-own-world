import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { resourcePaths } from '../config.js';
import { codexStyles } from './codex.styles.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: codexStyles,
        },
        template: html`
            <main class="page--codex">
                <section-header sectionname="NPC Codex">
                    <a href="/" slot="root-link">Home</a>
                    <a href="${resourcePaths.downloads}">Downloads</a>
                    <a href="${resourcePaths.tools}">Tools</a>
                </section-header>
                <section class="panel">
                    <h1>Known Hostiles</h1>
                </section>
            </main>
        `,
    };
}
