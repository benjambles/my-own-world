import { html } from 'lit';
import { RenderProps } from '../../../utils/render-template.js';

export default function (): RenderProps {
    return {
        assets: {
            styles: [{ href: '/static/styles/routes/tools/roster/roster.css' }],
            scripts: [],
        },
        template: html`<div class="page--game-create"></div>`,
    };
}
