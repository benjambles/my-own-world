import {
    getOpposedRollTargets,
    getRollState,
} from '@benjambles/skirmish-engine/dist/dice/dice-checks.js';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { callOutStyles } from '../../../global-css/callout.styles.js';

@customElement('dice-check')
export class DiceCheck extends LitElement {
    static styles = [
        callOutStyles,
        css`
            * {
                box-sizing: border-box;
            }

            .callout {
                --co-bg-color: #333;
                padding: 20px;
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .breakdown {
                display: flex;
                flex-direction: row;
                gap: 20px;
                align-items: flex-start;
                justify-content: center;
            }

            .breakdown span {
                display: flex;
                flex-direction: column-reverse;
                align-items: center;
            }

            b {
                display: inline-block;
                padding: 10px;
                background: #444;
                aspect-ratio: 1;
                line-height: 1;
                text-align: center;
                flex: 0 1 0%;
                width: 40px;
                border: 1px solid var(--border-color, #444);
                color: var(--text-color, white);
            }

            p {
                margin: 0 0 20px;
            }

            .roll-success b.result {
                --border-color: green;
                --text-color: green;
            }

            .roll-fail b.result {
                --border-color: red;
                --text-color: red;
            }
        `,
    ];

    @property({ type: Number })
    roll: number = 0;

    @property({ type: Number })
    target: number = 0;

    protected render() {
        const result = this.roll >= this.target ? 'success' : 'fail';
        const resultText = result === 'success' ? '✓' : '✕';

        return html`
            <div class="callout">
                <p><slot></slot></p>

                <div class="breakdown roll-${result}">
                    <span>Roll <b class="dice-display">${this.roll}</b></span>
                    <span>Target <b>${this.target}</b></span>
                    <span
                        >Result
                        <b class="result" title="${result}">${resultText}</b></span
                    >
                </div>
            </div>
        `;
    }
}

@customElement('opposed-check')
export class OpposedCheck extends LitElement {
    static styles = [
        callOutStyles,
        css`
            * {
                box-sizing: border-box;
            }

            .callout {
                --co-bg-color: #333;
                display: flex;
                align-items: center;
                flex-direction: column;
                padding: 20px;
                color: white;
            }

            .breakdown {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: center;
                gap: 20px;
            }

            .breakdown span {
                display: flex;
                align-items: center;
                flex-direction: column-reverse;
            }

            b {
                flex: 0 1 0%;
                display: inline-block;
                aspect-ratio: 1;
                height: 40px;
                padding: 10px;
                border: 1px solid var(--border-color, #444);
                color: var(--text-color, white);
                background: #444;
                line-height: 1;
                text-align: center;
            }

            b.wide {
                aspect-ratio: 2/1;
            }

            p {
                margin: 0 0 20px;
            }

            .roll-success b.result {
                --border-color: green;
                --text-color: green;
            }

            .roll-fail b.result {
                --border-color: red;
                --text-color: red;
            }

            .roll-critical b.result {
                --border-color: yellow;
                --text-color: yellow;
            }

            .results {
                margin-top: 30px;
                align-items: center;
            }

            .dice-display {
                padding-right: 20px;
                border-right: 1px solid #666;
            }
        `,
    ];

    @property({ type: Number })
    actorValue: number = 0;

    @property()
    actorText: string = '';

    @property({ type: Number })
    targetValue: number = 0;

    @property()
    targetText: string = '';

    @property({ type: Number })
    roll: number = 0;

    protected render() {
        const rollTargets = getOpposedRollTargets(this.actorValue, this.targetValue);
        const baseRollTargets = getOpposedRollTargets(6, 6);
        const result = getRollState(rollTargets, this.roll);
        const modifier = this.actorValue - this.targetValue;

        return html`
            <div class="callout opposed-check">
                <p><slot></slot></p>

                <div class="breakdown">
                    <span>${this.actorText} <b>${this.actorValue}</b></span>
                    -
                    <span>${this.targetText} <b>${this.targetValue}</b></span>
                    =
                    <span>Modifier <b>${modifier >= 0 ? '+' : ''}${modifier}</b></span>
                </div>

                <div class="breakdown results roll-${result}">
                    <span>Roll <b>${this.roll}</b></span>
                    <span class="dice-display"
                        >Modified <b>${this.roll + modifier}</b></span
                    >
                    <span>
                        Fail
                        <b class="${result === 'fail' ? 'result' : ''} wide">
                            ${cappedMin(1, baseRollTargets.fail)}
                        </b>
                    </span>
                    <span>
                        Success
                        <b class="${result === 'success' ? 'result' : ''} wide">
                            ${cappedMax(
                                baseRollTargets.success,
                                baseRollTargets.critical,
                            )}
                        </b>
                    </span>
                    <span>
                        Critical
                        <b class="${result === 'critical' ? 'result' : ''} wide">
                            ${cappedMax(baseRollTargets.critical, 13)}
                        </b>
                    </span>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dice-check': DiceCheck;
        'opposed-check': OpposedCheck;
    }
}

function cappedMin(min: number, max: number) {
    if (isNaN(max)) return '-';
    if (min === max) return `${min}`;

    return `1 - ${max}`;
}

function cappedMax(min: number, nextMin: number) {
    if (isNaN(min)) return '-';
    if (min === nextMin - 1) return `${min}`;
    if (isNaN(nextMin)) return `${min} - 12`;

    return `${min} - ${nextMin - 1}`;
}
