import { html } from 'lit';
import { layout } from '@benjambles/mow-ui/dist/components/pages/layout.js';

export function template(data) {
    const page = html`<h1>Campaigns</h1>`;

    return html`${layout(data, page)}`;
}
