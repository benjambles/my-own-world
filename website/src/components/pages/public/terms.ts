import type { LitTpl } from '../../../utils/templates/lit-tpl';
import { layout } from '../layout';

export const terms: LitTpl<any> = (context, data) => {
    const { html } = context;

    const page = html`
        <main class="page--terms">
            <div class="container">
                <h1>Terms and Conditions</h1>
            </div>
        </main>
    `;

    return html`${layout(context, data, page)}`;
};
