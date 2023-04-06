import { time } from '@benjambles/mow-ui/core.js';
import { html } from 'lit';
import { layout } from '../../../layouts/core/static-layout.js';
import { RosterData, urlPattern } from './index.js';
import styles from './roster.css.js';

export default {
    assets: {
        styles: [{ href: '/static/styles/routes/tools/roster/roster.css' }],
        scripts: [],
    },
    render: function (data: RosterData) {
        const page = html`<main class="page--roster">
            <section>
                <h1>${data.content.title}</h1>

                <div class="filters">
                    <a href="${urlPattern}" data-filter="">All</a>
                    <a href="${urlPattern}?type=campaign" data-filter="campaign">
                        Campaign
                    </a>
                    <a href="${urlPattern}?type=skirmish" data-filter="skirmish">
                        Skirmish
                    </a>
                </div>

                <form action="/roster/delete">
                    <div class="cards">
                        <ul class="${styles.cardList}">
                            ${data.content.games.map(gameTile)}
                        </ul>
                    </div>
                </form>

                <div class="${styles.buttonGroup}">
                    <a href="${urlPattern}/new-skirmish" class="${styles.buttonOutline}">
                        Hire a crew (Skirmish)
                    </a>
                    <a href="${urlPattern}/new-campaign" class="${styles.buttonOutline}">
                        Hire a crew (Campaign)
                    </a>
                </div>
            </section>
        </main>`;

        return html`${layout(data, page)}`;
    },
};

function gameTile(data: RosterData['content']['games'][number]) {
    return html`<li>
        <a href="/play/${data.id}" class="${styles.slidePanel}">
            <span>${data.name}</span>

            <span> Created: ${time(data.createdOn)} </span>
            <span>${data.type}</span>
            <span>
                ${data.type === 'campaign' ? data.currentMission : data.credits}
            </span>
        </a>
        <div class="${styles.buttonGroup}">
            <a href="${urlPattern}/${data.id}" class="${styles.buttonOutline}">Edit</a>
            <button value="${data.id}" class="${styles.buttonDestructive}">Delete</button>
        </div>
    </li>`;
}
