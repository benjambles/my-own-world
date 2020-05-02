import { clientContext, clientResult } from '../../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../../utils/templates/server-context';
import type { TurnOrder } from '../npc-types';

export function turnOrder(context: clientContext, turns: TurnOrder): clientResult;
export function turnOrder(context: serverContext, turns: TurnOrder): serverResult;
export function turnOrder(context, turns: TurnOrder) {
    const { html } = context;

    return html`<section>
        <h3>Turn order</h3>
        <ul>
            ${turns.map(turn => html`<li>${turn}</li>`)}
        </ul>
    </section>`;
}
