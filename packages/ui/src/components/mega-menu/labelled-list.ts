import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

type MenuTypes = 'primary' | 'secondary';

@customElement('labelled-list')
export class LabelledList extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            container: list / inline-size;
        }

        p {
            margin-bottom: 3rem;
            font-size: 1.8rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
        }

        ::slotted(labelled-list-item) {
            margin-bottom: 1rem;
            font-size: 1.8rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
        }

        .secondary ::slotted(labelled-list-item) {
            font-size: 2.6rem;
            letter-spacing: 0.1em;
        }

        @container list (min-width: 300px) {
            p {
                margin-bottom: 4rem;
            }

            ::slotted(labelled-list-item) {
                margin-bottom: 2rem;
            }

            .secondary ::slotted(labelled-list-item) {
                margin-bottom: 1.5rem;
                font-size: 3.2rem;
            }
        }
    `;

    @property()
    accessor header;

    @property()
    accessor type: MenuTypes = 'secondary';

    protected render() {
        return html`
            ${this.header
                ? html`<p id="heading" aria-hidden="true">${this.header}</p>`
                : nothing}
            <div
                role="list"
                aria-labelledby="heading"
                class="${classMap({ secondary: this.type === 'secondary' })}"
            >
                <slot></slot>
            </div>
        `;
    }
}

@customElement('labelled-list-item')
export class LabelledListItem extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            display: block;
            --text-color: var(--list-item-text, var(--shade-0));
            --text-color-active: var(--list-item-text-active, var(--shade-0));
            --text-underline-active: var(--list-item-underline-active, var(--basic-4));
        }

        a {
            color: var(--text-color);
            text-decoration: none;
        }
        a:is(:hover, a:focus) {
            color: var(--text-color-active);
        }

        .active {
            color: var(--text-color-active);
            text-decoration: underline var(--text-underline-active);
        }
    `;

    @property()
    accessor href;

    @property({ type: Boolean })
    accessor active = false;

    protected render() {
        return html`
            <a
                href="${this.href}"
                role="listitem"
                class=${classMap({ active: this.active })}
            >
                <slot></slot>
            </a>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'labelled-list': LabelledList;
        'labelled-list-item': LabelledListItem;
    }
}
