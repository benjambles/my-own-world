import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../utils/templates/server-context';
import { layout } from '../layout';

export function terms(context: clientContext, data): clientResult;
export function terms(context: serverContext, data): serverResult;
export function terms(context, data) {
    const { html } = context;

    const page = html`
        <main class="page--terms">
            <div class="container">
                <h1>Terms and Conditions</h1>
            </div>
        </main>
    `;

    return html`${layout(context, data, page)}`;
}
