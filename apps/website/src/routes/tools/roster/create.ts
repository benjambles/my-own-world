import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';

export default function (data): RenderProps {
    return {
        assets: {
            inlineStyles: [],
        },
        template: html`
            <div class="page--game-create">
                <form action="/game/create?type=${data.game.type}"></form>
            </div>
        `,
    };
}
