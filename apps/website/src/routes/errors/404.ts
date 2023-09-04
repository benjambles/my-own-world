import { html } from 'lit';
import { RenderProps } from '../../utils/render-template.js';

type ErrorData = {
    status: string;
    error: string | object;
};

export default function (data: ErrorData): RenderProps {
    return {
        assets: {
            styles: [],
            scripts: [],
        },
        template: html`<main class="page--404">
            <section>
                <h1>${data.status} - Not Found</h1>

                <p>
                    ${typeof data.error === 'string'
                        ? data.error
                        : JSON.stringify(data.error)}
                </p>
            </section>
        </main>`,
    };
}
