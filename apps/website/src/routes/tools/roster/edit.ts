import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { paths } from './config.js';
import { Game } from './index.js';

export default function (game: Game): RenderProps {
    return {
        assets: {
            inlineStyles: [],
        },
        template: html`
            <div class="page--game-edit">
                <main class="page--game-create">
                    <section class="cont-m">
                        <h1 class="gradient-text">Form a crew</h1>

                        <edit-skirmish
                            rosterurl=${paths.rosterById}
                            .gamedata=${game}
                        ></edit-skirmish>
                    </section>
                </main>
            </div>
        `,
    };
}
