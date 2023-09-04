import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('view-lock')
export class ViewLock extends LitElement {
    static EventNameRegex = new RegExp(/^[a-zA-Z ]*/);

    @property({ reflect: true, type: Boolean })
    isConstrained = false;

    @property()
    watchedEvents = '';

    connectedCallback() {
        super.connectedCallback();

        if (!ViewLock.EventNameRegex.test(this.watchedEvents)) {
            throw new Error('Invalid event string passed in attributes');
        }

        const eventList = this.watchedEvents.split(' ').filter(Boolean);

        eventList.forEach((eventName) => {
            this.addEventListener(eventName, this._setConstrained);
        });
    }

    private _setConstrained(e: CustomEvent) {
        this.isConstrained = e.detail;
    }

    render() {
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-lock': ViewLock;
    }
}
