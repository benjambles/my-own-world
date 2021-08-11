import type { LitTpl } from '../../../utils/templates/lit-tpl.js';
import layoutStyles from '../../global-css/base.css.json';
import { layout } from '../layout.js';

export const terms: LitTpl<any> = (context, data) => {
    const { html } = context;

    const page = html`
        <main class="page--terms">
            <div class="${layoutStyles.container}">
                <h1>Terms and Conditions</h1>
            </div>
        </main>
    `;

    return html`${layout(context, data, page)}`;
};