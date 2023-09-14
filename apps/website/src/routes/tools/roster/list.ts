import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import '@benjambles/mow-ui/components/filter-bar/filter-bar.js';
import '@benjambles/mow-ui/components/section-header/section-header.js';
import { time } from '@benjambles/mow-ui/core.js';
import { html, nothing } from 'lit';
import { paths } from './config.js';
import { RosterData } from './index.js';
import { rosterStyles } from './roster.styles.js';

export default function (data: RosterData): RenderProps {
    return {
        assets: {
            inlineStyles: rosterStyles,
        },
        template: html`
            <section-header sectionname="Roster">
                <a slot="root-link" href="/tools">Tools</a>
                <a href="/tools/scenarios">Scenario Builder</a>
                <a href="/tools/npcs">NPC Builder</a>
            </section-header>
            <main class="page--roster">
                <section class="panel">
                    <h1>${data.content.title}</h1>

                    <form action="${paths.delete}">
                        <filter-bar>
                            <filter-item href="${paths.index}?type=all" filter="all"
                                >All</filter-item
                            >
                            <filter-item
                                href="${paths.index}?type=campaign"
                                filter="campaign"
                                >Campaign</filter-item
                            >
                            <filter-item
                                href="${paths.index}?type=skirmish"
                                filter="skirmish"
                                >Skirmish</filter-item
                            >
                        </filter-bar>

                        <div class="cards">
                            <ul class="card-list">
                                ${data.content.games.map(gameTile)}
                            </ul>
                        </div>
                    </form>

                    <div class="button-group col-to-row">
                        <a href="${paths.newSkirmish}" class="outline-button">
                            Hire a crew (Skirmish)
                        </a>
                        <a href="${paths.newCampaign}" class="outline-button">
                            Hire a crew (Campaign)
                        </a>
                    </div>
                </section>
            </main>
        `,
    };
}

function gameTile(data: RosterData['content']['games'][number]) {
    return html`<li data-game-type="${data.type}" class="card callout">
        <a href="${paths.rosterById.replace(':rosterId', data.id)}">
            <span>${data.name}</span>
            ${data.type === 'campaign'
                ? html`<span>${data.campaignName}</span>`
                : nothing}

            <span>Created: ${time(data.createdOn)}</span>
            <span>
                ${data.type}:
                ${data.type === 'skirmish' ? `${data.credits} credits` : data.difficulty}
            </span>
        </a>
    </li>`;
}
