import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { rulesPaths } from '../config.js';

@customElement('rules-nav')
export class RulesNav extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
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
                    <li><a href="${rulesPaths.index}">Rules</a></li>
                    <li><a href="${rulesPaths.quickstart}">Quick Start</a></li>
                    <li><a href="${rulesPaths.turnorder}">Turn Order</a></li>
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
