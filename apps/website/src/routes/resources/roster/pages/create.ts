import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { rosterPaths } from '../config.js';

type CreateGameProps = {
    gameId: string;
};

export default function (data: CreateGameProps): RenderProps {
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
                <section-header sectionname="Create Skirmish">
                    <a slot="root-link" href="${rosterPaths.index}">Rosters</a>
                    <a href="/tools/mission-creator">Mission Creator</a>
                    <a href="/tools/npc-creator">NPC Creator</a>
                </section-header>
                <section class="cont-m">
                    <h1 class="gradient-text">Form a crew</h1>
                    <with-game gameid="${data.gameId}">
                        <create-skirmish
                            rosterurl=${rosterPaths.rosterById}
                        ></create-skirmish>
                    </with-game>
                </section>
            </main>
        `,
    };
}
