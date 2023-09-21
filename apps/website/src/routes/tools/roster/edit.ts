import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { Game } from './index.js';

export default function (game: Game): RenderProps {
    return {
        assets: {
            inlineStyles: [],
        },
        template: html`<div class="page--game-edit">${game.name}</div>`,
    };
}
