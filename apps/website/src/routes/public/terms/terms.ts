import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';

export default function (): RenderProps {
    return {
        assets: {
            inlineStyles: [],
        },
        template: html`
            <main class="page--terms">
                <div>
                    <h1>Terms and Conditions</h1>
                </div>
            </main>
        `,
    };
}
