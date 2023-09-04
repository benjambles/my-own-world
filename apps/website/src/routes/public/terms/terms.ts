import { html } from 'lit';
import { RenderProps } from '../../../utils/render-template.js';

export default function (): RenderProps {
    return {
        assets: {
            styles: [],
            scripts: [],
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
