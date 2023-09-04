import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mow-action')
export class MowAction extends LitElement {
    @property()
    eventTrigger = '';

    @property()
    eventData = '';

    @property({ type: Boolean })
    preventDefault = false;

    connectedCallback() {
        super.connectedCallback();

        if (!this.eventTrigger) {
            throw new Error('Invalid event name');
        }

        this.addEventListener('click', (event) => {
            if (this.preventDefault) {
                event.preventDefault();
            }

            this.dispatchEvent(
                new CustomEvent(this.eventTrigger, {
                    detail: this.eventData,
                    bubbles: true,
                    composed: true,
                }),
            );
        });
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mow-action': MowAction;
    }
}
