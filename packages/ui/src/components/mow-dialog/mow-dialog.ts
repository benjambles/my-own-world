import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { composedEvent } from '../../utils/events.js';

@customElement('mow-dialog')
export class MowDialog extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --background: var(--dialog-background, #e7e7e8);
            --close-color: var(--dialog-close-color, rgb(0, 0, 0));
            --close-hover: var(--dialog-close-hover, rgba(255, 0, 0, 0.8));
        }

        dialog {
            border: 0 none;
            outline: 0 none;
            min-width: 300px;
            padding: 25px 20px 35px;
            background-color: transparent;
            background-image: linear-gradient(
                    45deg,
                    transparent 10px,
                    var(--background) 10px
                ),
                linear-gradient(135deg, var(--background) 0px, var(--background) 0px),
                linear-gradient(225deg, transparent 10px, var(--background) 10px),
                linear-gradient(315deg, var(--background) 0px, var(--background) 0px);
            background-position:
                left bottom,
                right bottom,
                right top,
                left top;
            background-repeat: no-repeat;
            background-size: 51% 51%;
            filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.1));
        }

        dialog::backdrop {
            --overlay: var(--dialog-overlay, rgba(0, 0, 0, 0.9));
            background-color: var(--overlay);
        }

        .close-button {
            border: 0;
            padding: 5px;
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 2.4rem;
            line-height: 1;
            background: none;
            color: var(--close-color);
            cursor: pointer;
        }

        .close-button:hover,
        .close-button:focus {
            color: var(--close-hover);
        }
    `;
    static DefaultEventName = 'modaltoggle';

    @property()
    onCloseEventName = '';

    @property()
    triggerCloseEventName = '';

    @property()
    triggerOpenEventName = '';

    @query('dialog', true)
    private _dialogElement!: HTMLDialogElement;

    connectedCallback() {
        super.connectedCallback();

        window.addEventListener(this.triggerOpenEventName, this._openDialog);

        if (this.triggerCloseEventName) {
            window.addEventListener(this.triggerCloseEventName, this._closeDialog);
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener(this.triggerOpenEventName, this._openDialog);
        window.removeEventListener(this.triggerCloseEventName, this._closeDialog);
    }

    private _closeDialog = () => {
        this._dialogElement.close();
    };

    private _openDialog = () => {
        this._dialogElement.showModal();
        this.dispatchEvent(composedEvent(MowDialog.DefaultEventName, true));
    };

    private _onDialogClose() {
        [MowDialog.DefaultEventName, this.onCloseEventName].forEach((eventName) => {
            if (!eventName) return;
            this.dispatchEvent(composedEvent(eventName, false));
        });
    }

    render() {
        return html`
            <dialog @close=${this._onDialogClose}>
                <slot></slot>
                <button @click=${this._closeDialog} class="close-button">
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
