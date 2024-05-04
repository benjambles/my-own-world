import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { callOutStyles } from '../../../global-css/callout.styles.js';
import { flexColToRow } from '../../../global-css/container.styles.js';

@customElement('unit-card')
export class UnitCard extends LitElement {
    static styles = [
        callOutStyles,
        flexColToRow,
        css`
            * {
                box-sizing: border-box;
            }

            :host {
                display: block;
                max-width: 600px;
            }

            .callout {
                padding-bottom: 20px;
            }

            .header {
                padding: 3px 10px 3px 20px;
                background: rgb(255 0 0 / 0.8);
                color: white;
                font-family: --font-special;
                font-size: 1.8rem;
                font-variant: small-caps;
            }

            .keywords {
                display: flex;
                gap: 10px;
                padding-left: 20px;
            }

            .keywords span::after {
                content: ',';
            }

            .stats {
                list-style: none;
                margin: 0 0 10px;
                padding: 0;
                display: flex;
                flex-direction: row;
            }

            .stats li {
                display: flex;
                flex-direction: column;
                flex: 1;
                align-items: center;
                background-color: #eee;
                color: #333;
            }

            .stats span,
            .stats abbr {
                padding: 5px 20px;
            }

            .col-to-row div {
                flex: 1;
            }

            .panel {
                padding: 10px 20px;
            }
        `,
    ];

    protected render() {
        return html`
            <div class="callout">
                <div class="header name">Captain Haddock - 200 Credits</div>
                <ul class="stats">
                    <li>
                        <abbr title="Actions">A</abbr>
                        <span class="value">5</span>
                    </li>
                    <li>
                        <abbr title="Movement">M</abbr>
                        <span class="value">4</span>
                    </li>
                    <li>
                        <abbr title="Strength">S</abbr>
                        <span class="value">5</span>
                    </li>

                    <li>
                        <abbr title="Resilience">R</abbr>
                        <span class="value">8</span>
                    </li>
                    <li>
                        <abbr title="Willpower">W</abbr>
                        <span class="value">8</span>
                    </li>

                    <li>
                        <abbr title="Tech">T</abbr>
                        <span class="value">1</span>
                    </li>

                    <li>
                        <abbr title="Defence - Physical">D(P)</abbr>
                        <span class="value">8</span>
                    </li>
                    <li>
                        <abbr title="Defence - Tech">D(T)</abbr>
                        <span class="value">4</span>
                    </li>
                </ul>

                <div class="col-to-row">
                    <div>
                        <span class="header" id="armour-header">Armour</span>
                        <div
                            class="panel armour"
                            role="list"
                            aria-labelledby="armour-header"
                        ></div>

                        <span class="header" id="weapons-header">Weapons</span>
                        <div
                            class="panel weapons"
                            role="list"
                            aria-labelledby="weapons-header"
                        ></div>

                        <span class="header" id="consumables-header"> Consumables </span>
                        <div
                            class="panel consumables"
                            role="list"
                            aria-labelledby="consumables-header"
                        ></div>
                    </div>
                    <div>
                        <span class="header" id="training-header">Training</span>
                        <div
                            class="panel training"
                            role="list"
                            aria-labelledby="training-header"
                        >
                            <span>Ranged - 3</span>
                            <span>Melee - 1</span>
                            <span>Powered Armour - 1</span>
                        </div>
                        <span class="header" id="traits-header">Traits</span>
                        <div
                            class="panel traits"
                            role="list"
                            aria-labelledby="traits-header"
                        >
                            <span>Old Injury</span>
                            <span>Brutish</span>
                        </div>
                    </div>
                </div>

                <span class="header" id="keywords-header">Keywords</span>
                <div class="panel keywords" role="list" aria-labelledby="keywords-header">
                    <span>Thermal vision</span>
                    <span>Low-light vision</span>
                    <span>Organic</span>
                    <span>Rebreather</span>
                    <span>Quick-switch</span>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'unit-card': UnitCard;
    }
}
