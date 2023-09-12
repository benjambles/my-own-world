import { html } from 'lit';
import { RenderProps } from '../../../utils/render-template.js';

export default function (): RenderProps {
    return {
        assets: {
            scripts: [],
            styles: [],
        },
        template: html`
            <main class="page--terms">
                <div class="">
                    <h1>Terms and Conditions</h1>
                </div>
            </main>
        `,
    };
}
