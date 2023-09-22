import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { paths } from '../config.js';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: [],
            scripts: [
                {
                    src: '/static/js/roster.bundle.js',
                    lazy: 'defer',
                    module: true,
                },
            ],
        },
        template: html`
            <main class="page--game-create">
                <section class="cont-m">
                    <h1 class="gradient-text">Form a crew</h1>

                    <create-skirmish rosterurl=${paths.rosterById}></create-skirmish>
                </section>
            </main>
        `,
    };
}
