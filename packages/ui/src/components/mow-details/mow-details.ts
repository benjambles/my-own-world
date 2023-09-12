import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { composedEvent } from '../../utils/events.js';

@customElement('mow-details')
export class MowDetails extends LitElement {
    static styles = css`
        * {
            box-sizing: 'border-box';
        }
    `;

    public toggleEventName = 'menutoggle';

    @query('details', true)
    protected menuElement!: HTMLDetailsElement;

    @query('details summary', true)
    protected summaryElement!: HTMLElement;

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('keydown', this.handleKeydown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('keydown', this.handleKeydown);
    }

    public handleToggle() {
        this.dispatchEvent(composedEvent(this.toggleEventName, this.menuElement.open));
    }

    public handleKeydown = ({ key }: KeyboardEvent) => {
        if (key !== 'Escape' || !this.menuElement.open) return;

        this.summaryElement.focus();
        this.menuElement.open = false;
    };

    render() {
        return html`
            <details @toggle=${this.handleToggle}>
                <summary aria-haspopup="true" role="button">
                    <slot name="button"></slot>
                </summary>
                <div class="dropdown-menu" role="menu">
                    <slot></slot>
                </div>
            </details>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mow-details': MowDetails;
    }
}
