import { SkirmishListView } from '@benjambles/mow-api/src/resources/skirmishes/skirmishes.js';
import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/mow-dialog/mow-dialog.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { rosterPaths } from '../config.js';
import { rosterStyles } from './roster.styles.js';

type SkirmishListProps = {
    limit: number;
    offset: number;
    count: number;
    items: SkirmishListView[];
    gameId: string;
};

export default function (props: SkirmishListProps): RenderProps {
    const eventTriggers = {
        createSkirmish: { open: 'mow:createskirmish.open' },
    };

    return {
        assets: {
            inlineStyles: rosterStyles,
            scripts: [
                {
                    src: '/static/js/roster.bundle.js',
                    lazy: 'defer',
                    module: true,
                },
            ],
        },
        template: html`
            <section-header sectionname="Roster">
                <a slot="root-link" href="/tools">Tools</a>
                <a href="/tools/mission-creator">Mission Creator</a>
                <a href="/tools/npc-creator">NPC Creator</a>
            </section-header>
            <main class="page--roster">
                <section class="panel">
                    <h1>Crews</h1>
                    <with-game gameid=${props.gameId}>
                        <skirmish-list
                            rooturl=${rosterPaths.index}
                            rosterurl=${rosterPaths.rosterById}
                            >${props.items.map((skirmish) => {
                                return html`<skirmish-tile
                                    createdon=${skirmish.createdOn}
                                    id=${skirmish._id}
                                    name=${skirmish.name}
                                    points=${skirmish.points}
                                    urlpattern=${rosterPaths.rosterById}
                                ></skirmish-tile>`;
                            })}</skirmish-list
                        >

                        <div class="button-group col-to-row">
                            <mow-action
                                preventdefault
                                eventname=${eventTriggers.createSkirmish.open}
                            >
                                <a
                                    href="${rosterPaths.newSkirmish}"
                                    class="outline-button"
                                >
                                    Hire a crew (Skirmish)
                                </a>
                            </mow-action>
                            <a href="${rosterPaths.newCampaign}" class="outline-button">
                                Hire a crew (Campaign)
                            </a>
                        </div>

                        <mow-dialog
                            triggeropeneventname=${eventTriggers.createSkirmish.open}
                        >
                            <create-skirmish
                                rosterurl=${rosterPaths.rosterById}
                                ismodal
                            ></create-skirmish>
                        </mow-dialog>
                    </with-game>
                </section>
            </main>
        `,
    };
}
