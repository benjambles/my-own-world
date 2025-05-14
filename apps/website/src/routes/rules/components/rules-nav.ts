import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { rulesPaths } from '../config.js';
import { link } from '@benjambles/mow-ui/core.js';

@customElement('rules-nav')
export class RulesNav extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        :host {
            --link-color: var(--rn-link-color, var(--special-4));
            --hover-color: var(--rn-hover-color, rgba(0, 191, 255, 0.8));
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        a {
            color: var(--link-color) !important;
        }

        a:is(:hover, :focus-visible) {
            color: var(--hover-color) !important;
        }

        @media screen and (min-width: 992px) {
            :host {
                border-left: 1px solid #333;
                padding: 20px;
                margin-left: 20px;
                position: sticky;
                top: 20px;
            }
        }
    `;

    protected render() {
        return html`
            <nav>
                <ul>
                    ${Object.values(rulesPaths).map(
                        (linkProps) => html`<li>${link(linkProps)}</li>`,
                    )}
                </ul>
            </nav>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'rules-nav': RulesNav;
    }
}
