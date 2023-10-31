import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { composedEvent } from '../../utils/events.js';

@customElement('mow-action')
export class MowAction extends LitElement {
    @property()
    accessor eventData = '';

    @property()
    accessor eventName = '';

    @property({ type: Boolean })
    accessor preventDefault = false;

    connectedCallback() {
        super.connectedCallback();

        if (!this.eventName) {
            throw new Error('Invalid event name');
        }

        this.addEventListener('click', (event) => {
            if (this.preventDefault) {
                event.preventDefault();
            }

            this.dispatchEvent(composedEvent(this.eventName, this.eventData));
        });
    }

    protected render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mow-action': MowAction;
    }
}
