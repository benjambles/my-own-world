import { html } from 'lit';
import { layout } from '../../layouts/core/static-layout.js';

export default {
    assets: {
        styles: [],
        scripts: [],
    },
    render: function error404(data) {
        const page = html`<main class="page--404">
            <section>
                <h1>${data.status} - Not Found</h1>

                <p>
                    ${typeof data.error === 'string'
                        ? data.error
                        : JSON.stringify(data.error)}
                </p>
            </section>
        </main>`;

        return html`${layout(data, page)}`;
    },
};
