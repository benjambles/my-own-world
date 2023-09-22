import { RenderProps } from '@benjambles/mow-server/dist/utils/web-rendering/render-template.js';
import { html } from 'lit';
import { errorStyles } from './error.styles.js';

type ErrorData = {
    error: string | object;
    status: string;
};

export default function (data: ErrorData): RenderProps {
    return {
        assets: {
            inlineStyles: errorStyles,
        },
        template: html`
            <main class="page--500">
                <section class="cont-m">
                    <h1>500 - It's happened again.</h1>

                    <p>
                        Something has gone horribly wrong. It's not your fault, it's ours.
                        We'll try to fix it as soon as possible.
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
