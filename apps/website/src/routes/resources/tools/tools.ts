import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { toolsStyles } from './tools.styles.js';
import { resourcePaths } from '../config.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: toolsStyles,
        },
        template: html`
            <main class="page--tools">
                <section-header sectionname="Tools">
                    <a href="/" slot="root-link">Home</a>
                    <a href="${resourcePaths.codex}">NPC Codex</a>
                    <a href="${resourcePaths.downloads}">Downloads</a>
                </section-header>
                <section class="panel">
                    <h1>Resources</h1>

                    <h2>Databases</h2>
                    <ul class="tool-links col-to-row">
                        <li>
                            <a class="callout" href="/resources/npcs">Adversaries</a>
                        </li>
                        <li>
                            <a class="callout" href="/resources/missions/">Missions</a>
                        </li>
                        <li>
                            <a class="callout" href="/resources/items">Catalogue</a>
                        </li>
                    </ul>

                    <h2>Tools</h2>
                    <ul class="tool-links col-to-row">
                        <li>
                            <a class="callout" href="/tools/rosters">Skirmish Rosters</a>
                        </li>
                        <li>
                            <a class="callout" href="/tools/npc-creator">NPC Creator</a>
                        </li>
                        <li>
                            <a class="callout" href="/tools/mission-creator"
                                >Mission Creator</a
                            >
                        </li>
                    </ul>
                </section>
            </main>
        `,
    };
}
