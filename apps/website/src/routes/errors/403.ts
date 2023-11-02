import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { errorStyles } from './error.styles.js';
import type { ErrorData } from './errors.js';

export default function (data: ErrorData): RenderProps {
    return {
        assets: {
            inlineStyles: errorStyles,
        },
        template: html`
            <main class="page--403">
                <section class="cont-m">
                    <h1>403 - You are not authorised!</h1>

                    <p>
                        We're not sure how you got to this page, but according to our
                        records you shouldn't be here. If you believe this is an error, do
                        let us know. Otherwise please head back to the previous page.
                    </p>

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
