import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

export const componentTag = 'link-list' as const;

@customElement(componentTag)
export class LinkList extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --link-color: var(--rn-link-color, var(--special-4));
            --hover-color: var(--rn-hover-color, rgba(0, 191, 255, 0.8));
            display: flex;
            flex-direction: column;
            padding: 20px;
        }

        ::slotted(labelled-list-item) {
            display: block;
            --list-item-text: var(--link-color);
            --list-item-text-active: var(--hover-color);
            --list-item-underline-active: var(--hover-color);
        }

        @media screen and (min-width: 992px) {
            :host {
                border-left: 1px solid #333;
                margin-left: 20px;
                position: sticky;
                top: 20px;
            }
        }
    `;

    protected render() {
        return html`
            <nav>
                <div role="list">
                    <slot></slot>
                </ul>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        [componentTag]: LinkList;
    }
}
