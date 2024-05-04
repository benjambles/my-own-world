import { SkirmishResponse } from '@benjambles/mow-api/src/resources/skirmishes/skirmishes.js';
import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { css, html } from 'lit';
import { rosterPaths } from '../config.js';

export default function (skirmish: SkirmishResponse): RenderProps {
    return {
        assets: {
            inlineStyles: [
                css`
                    .panel {
                        padding: 0 6rem;
                    }

                    h1 {
                        margin: 8rem 0 4rem;
                        font-size: 6rem;
                    }
                `,
            ],
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
                <section-header sectionname="Edit Skirmish">
                    <a slot="root-link" href="${rosterPaths.index}">Rosters</a>
                    <a href="/tools/mission-creator">Mission Creator</a>
                    <a href="/tools/npc-creator">NPC Creator</a>
                </section-header>
                <section class="panel">
                    <h1>Form a crew</h1>

                    <with-game gameid=${skirmish.game._id}>
                        <edit-skirmish
                            rosterurl=${rosterPaths.rosterById}
                            skirmishid=${skirmish._id}
                            skirmishcreatedon=${skirmish.createdOn}
                            skirmishdescription=${skirmish.description}
                            skirmishname=${skirmish.name}
                            skirmishpoints=${skirmish.points}
                        ></edit-skirmish>
                    </with-game>
                </section>
            </main>
        `,
    };
}
