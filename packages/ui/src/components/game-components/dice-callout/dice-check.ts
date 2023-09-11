import {
    getOpposedRollTargets,
    getRollState,
} from '@benjambles/skirmish-engine/dist/dice/dice-checks.js';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { callOutStyles } from '../../../global-css/callout.js';

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

    @property({ type: Number, attribute: true })
    roll: number = 0;

    @property({ type: Number, attribute: true })
    target: number = 0;

    protected render(): unknown {
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
                height: 40px;
                border: 1px solid var(--border-color, #444);
                color: var(--text-color, white);
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
                align-items: center;
                margin-top: 30px;
            }

            .dice-display {
                border-right: 1px solid #666;
                padding-right: 20px;
            }
        `,
    ];

    @property({ type: Number, attribute: true })
    actorValue: number = 0;

    @property({ type: String, attribute: true })
    actorText: string = '';

    @property({ type: Number, attribute: true })
    targetValue: number = 0;

    @property({ type: String, attribute: true })
    targetText: string = '';

    @property({ type: Number, attribute: true })
    roll: number = 0;

    protected render() {
        const rollTargets = getOpposedRollTargets(this.actorValue, this.targetValue);
        const baseRollTargets = getOpposedRollTargets(6, 6);
        const result = getRollState(rollTargets, this.roll);

        return html`<div class="callout opposed-check">
            <p><slot></slot></p>

            <div class="breakdown">
                <span>${this.actorText} <b>${this.actorValue}</b></span>
                -
                <span>${this.targetText} <b>${this.targetValue}</b></span>
                =
                <span>Modifier <b>${this.actorValue - this.targetValue}</b></span>
            </div>

            <div class="breakdown results roll-${result}">
                <span class="dice-display">Roll <b>${this.roll}</b></span>
                <span>
                    Fail
                    <b
                        class="${result === 'fail' ? 'result' : ''} wide"
                        title="Base: ${cappedMin(1, baseRollTargets.fail)}"
                    >
                        ${cappedMin(1, rollTargets.fail)}
                    </b>
                </span>
                <span>
                    Success
                    <b
                        class="${result === 'success' ? 'result' : ''} wide"
                        title="Base: ${cappedMax(
                            baseRollTargets.success,
                            baseRollTargets.critical,
                        )}"
                    >
                        ${cappedMax(rollTargets.success, rollTargets.critical)}
                    </b>
                </span>
                <span>
                    Critical
                    <b
                        class="${result === 'critical' ? 'result' : ''} wide"
                        title="Base: ${cappedMax(baseRollTargets.critical, 13)}"
                    >
                        ${cappedMax(rollTargets.critical, 13)}
                    </b>
                </span>
            </div>
        </div>`;
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
