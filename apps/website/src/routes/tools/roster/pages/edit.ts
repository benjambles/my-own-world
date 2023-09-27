import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { paths } from '../config.js';
import { Skirmish } from '../index.js';

export default function (skirmish: Skirmish): RenderProps {
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
            <main class="page--skirmish-edit">
                <section class="cont-m">
                    <h1 class="gradient-text">Form a crew</h1>

                    <edit-skirmish
                        rosterurl=${paths.rosterById}
                        .skirmishdata=${skirmish}
                    ></edit-skirmish>
                </section>
            </main>
        `,
    };
}
