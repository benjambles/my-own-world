import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/mow-dialog/mow-dialog.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { html } from 'lit';
import { paths } from './config.js';
import { Game } from './index.js';
import { rosterStyles } from './roster.styles.js';

type GameListProps = {
    limit: number;
    offset: number;
    count: number;
    games: Game[];
};

export default function (props: GameListProps): RenderProps {
    return {
        assets: {
            inlineStyles: rosterStyles,
            scripts: [
                {
                    src: '/static/js/roster-client.js',
                    lazy: 'defer',
                    module: true,
                },
            ],
        },
        template: html`
            <section-header sectionname="Roster">
                <a slot="root-link" href="/tools">Tools</a>
                <a href="/tools/scenarios">Scenario Builder</a>
                <a href="/tools/npcs">NPC Builder</a>
            </section-header>
            <main class="page--roster">
                <section class="panel">
                    <h1>Crews</h1>

                    <game-list rooturl=${paths.index} rosterurl=${paths.rosterById}
                        >${props.games.map((data) => {
                            return html`<game-tile
                                .data=${data}
                                urlpattern=${paths.rosterById}
                            ></game-tile>`;
                        })}</game-list
                    >

                    <div class="button-group col-to-row">
                        <mow-action preventdefault eventtrigger="opencreateskirmish">
                            <a href="${paths.newSkirmish}" class="outline-button">
                                Hire a crew (Skirmish)
                            </a>
                        </mow-action>
                        <a href="${paths.newCampaign}" class="outline-button">
                            Hire a crew (Campaign)
                        </a>
                    </div>
                </section>
            </main>
            <mow-dialog triggeropeneventname="opencreateskirmish">
                <create-skirmish rosterurl=${paths.rosterById} ismodal></create-skirmish>
            </mow-dialog>
        `,
    };
}
