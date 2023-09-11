import { html } from 'lit';
import { RenderProps } from '../../../utils/render-template.js';

export default function (data): RenderProps {
    return {
        assets: {
            styles: [{ href: '/static/styles/routes/tools/roster/roster.css' }],
            scripts: [],
        },
        template: html`
            <div class="page--game-create">
                <form action="/game/create?type=${data.game.type}"></form>
            </div>
        `,
    };
}
