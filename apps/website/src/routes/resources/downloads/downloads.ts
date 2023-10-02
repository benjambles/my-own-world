import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { downloadsStyles } from './downloads.styles.js';
import { resourcePaths } from '../config.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: downloadsStyles,
        },
        template: html`
            <main class="page--downloads">
                <section-header sectionname="Downloads">
                    <a href="/" slot="root-link">Home</a>
                    <a href="${resourcePaths.codex}">NPC Codex</a>
                    <a href="${resourcePaths.tools}">Tools</a>
                </section-header>
                <section class="panel">
                    <h1>Downloads</h1>
                </section>
            </main>
        `,
    };
}
