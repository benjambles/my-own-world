import { provide } from '@lit/context';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MowApi, requestContext } from '../../contexts/request.js';

@customElement('with-api')
class WithApi extends LitElement {
    @provide({ context: requestContext })
    private accessor api;

    @property()
    accessor apiHost = '';

    @property()
    accessor apiPathPrefix = '';

    connectedCallback() {
        super.connectedCallback();

        if (!this.apiHost) {
            throw new Error('An API host URL must be provided');
        }

        this.api = new MowApi(this.apiHost, this.apiPathPrefix);
    }

    protected render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'with-api': WithApi;
    }
}
