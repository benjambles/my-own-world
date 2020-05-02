import { clientContext, clientResult } from '../../../utils/templates/client-context';
import { serverContext, serverResult } from '../../../utils/templates/server-context';
import { actionsTable } from './actions-table/actions-table';
import { characteristicsList } from './characteristics-list/characteristics-list';
import { actionGrid } from './grid/grid';
import type { NPCCard } from './npc-types';
import { statsBlock } from './stats-block/stats-block';
import { turnOrder } from './turn-order/turn-order';

export function npcCard(context: clientContext, cardData: NPCCard): clientResult;
export function npcCard(context: serverContext, cardData: NPCCard): serverResult;
export function npcCard(
    context,
    { name, variant, stats, characteristics, turn_order, actions }: NPCCard
) {
    const { html } = context;

    return html`
        <article>
            <h1>${name}</h1>
            ${statsBlock(context, { name, variant, stats })}
            <div>
                ${actionGrid(context)}
            </div>

            <div>
                ${characteristicsList(context, characteristics)} ${actionsTable(context, actions)}
                ${turnOrder(context, turn_order)}
            </div>
        </article>
    `;
}
