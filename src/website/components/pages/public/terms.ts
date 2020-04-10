import {
    clientContext,
    clientResult,
    serverContext,
    serverResult,
} from '../../../typings/templates';
import { Layout } from '../layout';

export function Terms(context: clientContext, data): clientResult;
export function Terms(context: serverContext, data): serverResult;
export function Terms(context, data) {
    const { html } = context;

    const page = html`
        <main class="page--terms">
            <div class="container">
                <h1>Terms and Conditions</h1>
            </div>
        </main>
    `;

    return html`${Layout(context, data, page)}`;
}
