import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { callOutStyles } from '../../global-css/callout.styles.js';
import { composedEvent } from '../../utils/events.js';

@customElement('mow-dialog')
export class MowDialog extends LitElement {
    static styles = [
        callOutStyles,
        css`
            * {
                box-sizing: border-box;
            }

            :host {
                --background: var(--dialog-background, #e7e7e8);
                --close-color: var(--dialog-close-color, rgb(0, 0, 0));
                --close-hover: var(--dialog-close-hover, rgba(255, 0, 0, 0.8));
            }

            dialog {
                padding: 40px;
                border: 0 none;
                background: transparent;
            }

            slot {
                display: block;
                min-width: 300px;
                padding: 25px 20px;
                border: 0 none;
                outline: 0 none;
                filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
            }

            dialog::backdrop {
                --overlay: var(--dialog-overlay, rgba(0, 0, 0, 0.6));
                background-color: var(--overlay);
                backdrop-filter: blur(3px);
            }

            .close-button {
                --co-slice-size: 5px;
                border: 0;
                padding: 5px;
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 2.4rem;
                line-height: 1;
                color: var(--close-color);
                cursor: pointer;
            }

            .close-button:is(:hover, :focus, :focus-visible) {
                --co-bg-color: var(--close-hover);
                color: white;
                outline: none;
            }
        `,
    ];

    static ToggleEventName = 'mow:modal.toggle';

    @property()
    accessor onCloseEventName = '';

    @property()
    accessor triggerCloseEventName = '';

    @property()
    accessor triggerOpenEventName = '';

    @query('dialog', true)
    private accessor dialogElement!: HTMLDialogElement;

    connectedCallback() {
        super.connectedCallback();

        if (this.triggerOpenEventName) {
            window.addEventListener(this.triggerOpenEventName, this.openDialog);
        }

        if (this.triggerCloseEventName) {
            window.addEventListener(this.triggerCloseEventName, this.closeDialog);
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        if (this.triggerOpenEventName) {
            window.removeEventListener(this.triggerOpenEventName, this.openDialog);
        }

        if (this.triggerCloseEventName) {
            window.removeEventListener(this.triggerCloseEventName, this.closeDialog);
        }
    }

    private closeDialog = () => {
        this.dialogElement.close();
    };

    private openDialog = () => {
        this.dialogElement.showModal();
        this.dispatchEvent(composedEvent(MowDialog.ToggleEventName, true));
    };

    private onDialogClose() {
        [MowDialog.ToggleEventName, this.onCloseEventName].forEach((eventName) => {
            if (!eventName) return;
            this.dispatchEvent(composedEvent(eventName, false));
        });
    }

    protected render() {
        return html`
            <dialog @close=${this.onDialogClose}>
                <slot class="callout"></slot>
                <button @click=${this.closeDialog} class="close-button callout">
                    &#128473;
                </button>
            </dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mow-dialog': MowDialog;
    }
}
