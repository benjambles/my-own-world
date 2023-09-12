import { html } from 'lit';
import { RenderProps } from '../../../utils/render-template.js';

export default function (): RenderProps {
    return {
        assets: {
            scripts: [],
            styles: [],
        },
        template: html`<div class="page--game-edit"></div>`,
    };
}
