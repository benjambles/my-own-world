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
            <main class="page--404">
                <section class="cont-m">
                    <h1>404 - Not found!</h1>

                    <p>
                        Much like the rest of humanity this page count not be found. If
                        you got here from a link please let us know how it happened.
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
