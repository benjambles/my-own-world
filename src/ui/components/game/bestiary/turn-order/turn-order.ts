import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import { lazyStylesheet } from '../../../utils/lazy-stylesheet';
import type { TurnOrder } from '../npc-types';
import styles from './turn-order.css.json';

export const turnOrder: LitTpl<TurnOrder> = (context, turns: TurnOrder) => {
    const { html } = context;

    return html`
        ${lazyStylesheet(context, '/styles/core/bestiary/turn-order/turn-order.css')}
        <section class="${styles.turnOrder}">
            <h2>Turn order</h2>
            <ol>
                ${turns.map((turn) => html`<li>${turn}</li>`)}
            </ol>
        </section>
    `;
};
