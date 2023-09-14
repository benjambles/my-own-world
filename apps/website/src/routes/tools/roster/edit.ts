import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: [],
        },
        template: html`<div class="page--game-edit"></div>`,
    };
}
