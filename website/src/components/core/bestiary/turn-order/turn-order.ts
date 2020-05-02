import type { LitTpl } from '../../../../utils/templates/lit-tpl';
import type { TurnOrder } from '../npc-types';

export const turnOrder: LitTpl<TurnOrder> = (context, turns: TurnOrder) => {
    const { html } = context;

    return html`<section>
        <h3>Turn order</h3>
        <ul>
            ${turns.map(turn => html`<li>${turn}</li>`)}
        </ul>
    </section>`;
};
