import { html } from 'lit';
import { RenderProps } from '../../../utils/render-template.js';

export default function (): RenderProps {
    return {
        assets: {
            styles: [],
            scripts: [],
        },
        template: html`<div class="page--game-edit"></div>`,
    };
}
