import { html } from 'lit';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet.js';
import styles from './turn-order.css.js';

type TurnOrder = string[];

export function turnOrder(turns: TurnOrder) {
    return html`
        ${lazyStylesheet('/mow-ui/styles/core/bestiary/turn-order/turn-order.css')}
        <section class="${styles.turnOrder}">
            <h2>Turn order</h2>
            <ol>
                ${turns.map((turn) => html`<li>${turn}</li>`)}
            </ol>
        </section>
    `;
}
