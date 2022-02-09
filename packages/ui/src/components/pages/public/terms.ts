import { html } from 'lit';
import layoutStyles from '../../global-css/base.css.js';
import { layout } from '../layout.js';

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
