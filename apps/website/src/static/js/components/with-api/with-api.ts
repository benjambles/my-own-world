import { provide } from '@lit-labs/context';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MowApi, requestContext } from '../contexts/request.js';

@customElement('with-api')
class WithApi extends LitElement {
    @provide({ context: requestContext })
    private api = new MowApi('http://localhost:3000/api/v1');

    protected render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'with-api': WithApi;
    }
}
