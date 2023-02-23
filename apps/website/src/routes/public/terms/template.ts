import layoutStyles from '@benjambles/mow-ui/styles/base.css.js';
import { html } from 'lit';
import { layout } from '../../../layouts/core/static-layout.js';

export function terms(data) {
    const page = html`
        <main class="page--terms">
            <div class="${layoutStyles.container}">
                <h1>Terms and Conditions</h1>
            </div>
        </main>
    `;

    return html`${layout(data, page)}`;
}

export default terms;
