import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';

type ErrorData = {
    error: string | object;
    status: string;
};

export default function (data: ErrorData): RenderProps {
    return {
        assets: {
            inlineStyles: [],
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
