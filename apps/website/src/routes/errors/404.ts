import { html } from 'lit';
import { RenderProps } from '../../utils/render-template.js';

type ErrorData = {
    error: string | object;
    status: string;
};

export default function (data: ErrorData): RenderProps {
    return {
        assets: {
            scripts: [],
            styles: [],
        },
        template: html`
            <main class="page--404">
                <section>
                    <h1>${data.status} - Not Found</h1>

                    <p>
                        ${typeof data.error === 'string'
                            ? data.error
                            : JSON.stringify(data.error)}
                    </p>
                </section>
            </main>
        `,
    };
}
